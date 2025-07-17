"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/ui/navigation'
import AuthGuard from '@/components/ui/auth-guard'
import { Calendar, MapPin, Users, Clock, Search, Filter, CheckCircle, AlertCircle, Eye } from 'lucide-react'
import Link from 'next/link'

export default function VolunteerEvents() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [registrationLoading, setRegistrationLoading] = useState(new Set())

  useEffect(() => {
    fetchEvents()
    fetchRegistrations()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, filterLocation, filterDate])

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/registrations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setRegisteredEvents(new Set(data.map(reg => reg.eventId)))
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    }
  }

  const filterEvents = () => {
    let filtered = events

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by location
    if (filterLocation) {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(filterLocation.toLowerCase())
      )
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0]
        return eventDate === filterDate
      })
    }

    setFilteredEvents(filtered)
  }

  const handleRegister = async (eventId) => {
    setRegistrationLoading(prev => new Set(prev).add(eventId))
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId })
      })

      if (response.ok) {
        setRegisteredEvents(prev => new Set(prev).add(eventId))
      } else {
        const data = await response.json()
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Error registering for event:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setRegistrationLoading(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    }
  }

  const handleUnregister = async (eventId) => {
    setRegistrationLoading(prev => new Set(prev).add(eventId))
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/unregister', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId })
      })

      if (response.ok) {
        setRegisteredEvents(prev => {
          const newSet = new Set(prev)
          newSet.delete(eventId)
          return newSet
        })
      } else {
        const data = await response.json()
        alert(data.message || 'Unregistration failed')
      }
    } catch (error) {
      console.error('Error unregistering from event:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setRegistrationLoading(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    }
  }

  const getEventStatus = (eventDate) => {
    const now = new Date()
    const event = new Date(eventDate)
    
    if (event < now) {
      return { label: 'Past Event', color: 'bg-gray-100 text-gray-800', disabled: true }
    } else {
      return { label: 'Upcoming', color: 'bg-green-100 text-green-800', disabled: false }
    }
  }

  const getUniqueLocations = () => {
    const locations = events.map(event => event.location)
    return [...new Set(locations)].sort()
  }

  if (isLoading) {
    return (
      <AuthGuard requiredRole="VOLUNTEER">
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
    <AuthGuard requiredRole="VOLUNTEER">
      <div className="min-h-screen bg-gradient-to-b from-gray-400 to-teal-100">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
            <p className="text-gray-600 mt-2">Discover and join beach cleanup events in your area</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Events</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by title, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">All Locations</option>
                    {getUniqueLocations().map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {(searchTerm || filterLocation || filterDate) && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredEvents.length} of {events.length} events
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilterLocation('')
                    setFilterDate('')
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterLocation || filterDate ? 'No events found' : 'No events available'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterLocation || filterDate 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back later for new cleanup events'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const status = getEventStatus(event.date)
                const isRegistered = registeredEvents.has(event.id)
                const isLoading = registrationLoading.has(event.id)
                
                return (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        {isRegistered && (
                          <div className="ml-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {event._count.registrations} registered
                          {event.expectedVolunteers && ` / ${event.expectedVolunteers} expected`}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                        {event.description}
                      </p>

                      {event.safetyInstructions && (
                        <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-orange-800 mb-1">Safety Instructions</p>
                              <p className="text-xs text-orange-700 line-clamp-2">{event.safetyInstructions}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Link
                          href={`/volunteer/events/${event.id}`}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Link>
                        
                        {!status.disabled && (
                          <div>
                            {isRegistered ? (
                              <button
                                onClick={() => handleUnregister(event.id)}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isLoading ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600 mr-2"></div>
                                    Unregistering...
                                  </>
                                ) : (
                                  'Unregister'
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRegister(event.id)}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isLoading ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                    Registering...
                                  </>
                                ) : (
                                  'Register'
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}