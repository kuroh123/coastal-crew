"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/ui/navigation'
import AuthGuard from '@/components/ui/auth-guard'
import { Calendar, Users, CheckCircle, TrendingUp, Plus, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalVolunteers: 0,
    totalAttendance: 0
  })
  const [recentEvents, setRecentEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentEvents(data.recentEvents)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Events',
      value: stats.activeEvents,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Volunteers',
      value: stats.totalVolunteers,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Attendance',
      value: stats.totalAttendance,
      icon: CheckCircle,
      color: 'bg-teal-500',
      textColor: 'text-teal-600'
    }
  ]

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage cleanup and plantation events and volunteers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/events/create"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-6 h-6 mr-2" />
              Create New Event
            </Link>
            <Link
              href="/admin/events"
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <Eye className="w-6 h-6 mr-2" />
              View All Events
            </Link>
            <Link
              href="/admin/volunteers"
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <Users className="w-6 h-6 mr-2" />
              Manage Volunteers
            </Link>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Events</h2>
            {recentEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No events created yet</p>
            ) : (
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {event._count.registrations} registered
                      </p>
                      <p className="text-sm text-gray-500">
                        {event._count.attendances} attended
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}