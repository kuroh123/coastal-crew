"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/ui/navigation'
import AuthGuard from '@/components/ui/auth-guard'
import { Users, Search, Filter, Mail, Calendar, CheckCircle, Eye, UserCheck, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([])
  const [filteredVolunteers, setFilteredVolunteers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // all, active, inactive
  const [sortBy, setSortBy] = useState('name') // name, joinDate, eventsAttended

  useEffect(() => {
    fetchVolunteers()
  }, [])

  useEffect(() => {
    filterAndSortVolunteers()
  }, [volunteers, searchTerm, filterStatus, sortBy])

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/volunteers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setVolunteers(data)
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortVolunteers = () => {
    let filtered = volunteers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(volunteer => {
        if (filterStatus === 'active') {
          return volunteer.stats.registeredEvents > 0
        } else if (filterStatus === 'inactive') {
          return volunteer.stats.registeredEvents === 0
        }
        return true
      })
    }

    // Sort volunteers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'joinDate':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'eventsAttended':
          return b.stats.attendedEvents - a.stats.attendedEvents
        default:
          return 0
      }
    })

    setFilteredVolunteers(filtered)
  }

  const getVolunteerStatus = (volunteer) => {
    if (volunteer.stats.attendedEvents >= 10) {
      return { label: 'Champion', color: 'bg-purple-100 text-purple-800', icon: Award }
    } else if (volunteer.stats.attendedEvents >= 5) {
      return { label: 'Active', color: 'bg-green-100 text-green-800', icon: TrendingUp }
    } else if (volunteer.stats.registeredEvents > 0) {
      return { label: 'Registered', color: 'bg-blue-100 text-blue-800', icon: UserCheck }
    } else {
      return { label: 'New', color: 'bg-gray-100 text-gray-800', icon: Users }
    }
  }

  const getAttendanceRate = (volunteer) => {
    if (volunteer.stats.registeredEvents === 0) return 0
    return Math.round((volunteer.stats.attendedEvents / volunteer.stats.registeredEvents) * 100)
  }

  if (isLoading) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-gradient-to-b from-gray-400 to-teal-100">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Management</h1>
            <p className="text-gray-600 mt-2">Manage and track volunteer participation</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
                  <p className="text-2xl font-bold text-blue-600">{volunteers.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {volunteers.filter(v => v.stats.registeredEvents > 0).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Champions</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {volunteers.filter(v => v.stats.attendedEvents >= 10).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Attendance Rate</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {volunteers.length > 0 
                      ? Math.round(volunteers.reduce((sum, v) => sum + getAttendanceRate(v), 0) / volunteers.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Volunteers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">All Volunteers</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="name">Name</option>
                  <option value="joinDate">Join Date</option>
                  <option value="eventsAttended">Events Attended</option>
                </select>
              </div>
              
              <div className="flex items-end">
                {(searchTerm || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterStatus('all')
                    }}
                    className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
            
            {(searchTerm || filterStatus !== 'all') && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredVolunteers.length} of {volunteers.length} volunteers
                </p>
              </div>
            )}
          </div>

          {/* Volunteers Table */}
          {filteredVolunteers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No volunteers found' : 'No volunteers yet'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Volunteers will appear here once they register for events'
                }
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volunteer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Events Registered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Events Attended
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVolunteers.map((volunteer) => {
                      const status = getVolunteerStatus(volunteer)
                      const attendanceRate = getAttendanceRate(volunteer)
                      
                      return (
                        <tr key={volunteer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {volunteer.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {volunteer.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              <status.icon className="w-3 h-3 mr-1" />
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {volunteer.stats.registeredEvents}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                              {volunteer.stats.attendedEvents}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${attendanceRate}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{attendanceRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(volunteer.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              href={`/admin/volunteers/${volunteer.id}`}
                              className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}