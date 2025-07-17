"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/ui/navigation'
import AuthGuard from '@/components/ui/auth-guard'
import { Calendar, MapPin, Clock, CheckCircle, Eye, UserMinus, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function MyEvents() {
  const [events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState('upcoming') // upcoming, past, all
  const [isLoading, setIsLoading] = useState(true)
  const [unregisterLoading, setUnregisterLoading] = useState(new Set())

  useEffect(() => {
    fetchMyEvents()
  }, [])

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/my-events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error fetching my events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async (eventId) => {
    if (!confirm('Are you sure you want to unregister from this event?')) {
      return
    }

    setUnregisterLoading(prev => new Set(prev).add(eventId))
    
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
        // Remove the event from the list
        setEvents(events.filter(event => event.id !== eventId))
      } else {
        const data = await response.json()
        alert(data.message || 'Unregistration failed')
      }
    } catch (error) {
      console.error('Error unregistering from event:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setUnregisterLoading(prev => {
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
      return { label: 'Past', color: 'bg-gray-100 text-gray-800', isPast: true }
    } else {
      return { label: 'Upcoming', color: 'bg-green-100 text-green-800', isPast: false }
    }
  }

  const getFilteredEvents = () => {
    const now = new Date()
    
    switch (activeTab) {
      case 'upcoming':
        return events.filter(event => new Date(event.date) >= now)
      case 'past':
        return events.filter(event => new Date(event.date) < now)
      default:
        return events
    }
  }

  const filteredEvents = getFilteredEvents()

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: events.filter(e => new Date(e.date) >= new Date()).length },
    { id: 'past', label: 'Past Events', count: events.filter(e => new Date(e.date) < new Date()).length },
    { id: 'all', label: 'All Events', count: events.length }
  ]

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
            <p className="text-gray-600 mt-2">Manage your event registrations and view your cleanup history</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'upcoming' ? 'No upcoming events' : 
                 activeTab === 'past' ? 'No past events' : 'No events registered'}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'upcoming' ? 'You haven\'t registered for any upcoming events yet.' :
                 activeTab === 'past' ? 'You haven\'t attended any events yet.' :
                 'You haven\'t registered for any events yet.'}
              </p>
              {activeTab !== 'past' && (
                <Link
                  href="/volunteer/events"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Events
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const status = getEventStatus(event.date)
                const isUnregistering = unregisterLoading.has(event.id)
                const hasAttended = event.attendances && event.attendances.length > 0
                
                return (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              {status.label}
                            </span>
                            {hasAttended && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Attended
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {event.description}
                          </p>

                          {event.safetyInstructions && (
                            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="flex items-start">
                                <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs font-medium text-orange-800 mb-1">Safety Instructions</p>
                                  <p className="text-xs text-orange-700 line-clamp-2">{event.safetyInstructions}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-6 flex flex-col space-y-2">
                          <Link
                            href={`/volunteer/events/${event.id}`}
                            className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Link>
                          
                          {!status.isPast && (
                            <button
                              onClick={() => handleUnregister(event.id)}
                              disabled={isUnregistering}
                              className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isUnregistering ? (
                                <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600 mr-1"></div>
                                  Unregistering...
                                </>
                              ) : (
                                <>
                                  <UserMinus className="w-3 h-3 mr-1" />
                                  Unregister
                                </>
                              )}
                            </button>
                          )}
                        </div>
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