"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/ui/navigation'
import AuthGuard from '@/components/ui/auth-guard'
import { Calendar, CheckCircle, Clock, MapPin, Users, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function VolunteerDashboard() {
  const [stats, setStats] = useState({
    registeredEvents: 0,
    attendedEvents: 0,
    upcomingEvents: 0
  })
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [recentEvents, setRecentEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ecoTokens, setEcoTokens] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/volunteer/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setUpcomingEvents(data.upcomingEvents)
        setRecentEvents(data.recentEvents)
        setEcoTokens(data.ecoTokens ?? 0) // expects ecoTokens from API
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Registered Events',
      value: stats.registeredEvents,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Attended Events',
      value: stats.attendedEvents,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'EcoTokens',
      value: ecoTokens,
      icon: Leaf,
      color: 'bg-teal-500',
      textColor: 'text-teal-600'
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your cleanup activity overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                {/* Show redeem button only for EcoTokens card */}
                {card.title === 'EcoTokens' && (
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/volunteer/redeem-shop"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full font-semibold transition-colors text-sm"
                    >
                      Redeem EcoTokens
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/volunteer/events"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Browse Events
            </Link>
            <Link
              href="/volunteer/my-events"
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <Users className="w-6 h-6 mr-2" />
              My Events
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No upcoming events</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Events</h2>
              {recentEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent events</p>
              ) : (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          <span className="text-green-600">Attended</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}