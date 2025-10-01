'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { 
  BuildingStorefrontIcon, 
  BriefcaseIcon, 
  EnvelopeIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  ArrowUpRightIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { authAPI, projectsAPI, contactAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'

interface DashboardStats {
  projects: number
  contacts: number
  unreadContacts: number
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    contacts: 0,
    unreadContacts: 0
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [userResponse, projectsResponse, contactsResponse] = await Promise.all([
        authAPI.getProfile(),
        projectsAPI.getAllProjects(),
        contactAPI.getContacts({ limit: 1 })
      ])

      if (userResponse.success) {
        setUser(userResponse.data.user)
      }

      setStats({
        projects: projectsResponse.success ? projectsResponse.data?.length || 0 : 0,
        contacts: contactsResponse.success ? contactsResponse.pagination?.total || 0 : 0,
        unreadContacts: contactsResponse.success ? contactsResponse.pagination?.unreadCount || 0 : 0
      })

    } catch (error) {
      handleApiError(error, 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authAPI.logout()
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const menuItems = [
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: BriefcaseIcon,
      description: 'Manage your construction projects',
      count: stats.projects,
      gradient: 'from-blue-600 to-blue-800',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: EnvelopeIcon,
      description: 'View customer inquiries',
      count: stats.contacts,
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : null,
      gradient: 'from-emerald-600 to-emerald-800',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
      shadowColor: 'shadow-emerald-500/25'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="bg-primary text-white p-2 rounded-lg mr-3 flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                  <Image
                    src="/logo.png"
                    alt="Octad Engineering Limited Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    onError={() => {
                      // Show building icon if logo fails
                    }}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Octad Engineering Admin</h1>
                <p className="text-xs sm:text-sm text-gray-500">Content Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs sm:text-sm text-gray-500">Alimi Gbolahan</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex-shrink-0"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Logout</span>
                <span className="xs:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 sm:px-0 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="animate-pulse">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Welcome back, Alimi Gbolahan! 👋</h2>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg">Manage your construction projects and customer messages</p>
              </div>
              <div className="hidden sm:block animate-bounce">
                <BuildingStorefrontIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 sm:px-0 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Projects Stats */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <BriefcaseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Projects</h3>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">{stats.projects}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Total projects</p>
                </div>
                <div className="text-blue-200 group-hover:text-blue-300 transition-colors">
                  <ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>

            {/* Messages Stats */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
                      <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Messages</h3>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">{stats.contacts}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Total messages</p>
                </div>
                <div className="text-emerald-200 group-hover:text-emerald-300 transition-colors">
                  <ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>

            {/* Unread Messages */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg animate-pulse">
                      <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Unread</h3>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600 group-hover:text-red-700 transition-colors">{stats.unreadContacts}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">New messages</p>
                </div>
                <div className="text-red-200 group-hover:text-red-300 transition-colors">
                  {stats.unreadContacts > 0 && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="px-4 sm:px-0">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Content Management
            </span>
            <div className="ml-2 sm:ml-3 w-4 sm:w-6 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-3 sm:p-4 ${item.bgColor} rounded-xl shadow-lg ${item.shadowColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 group-hover:text-white/90 transition-colors duration-300 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                      {item.count !== null && (
                        <span className="bg-gray-100 group-hover:bg-white/20 text-gray-800 group-hover:text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300">
                          {item.count}
                        </span>
                      )}
                      {item.badge && (
                        <span className="bg-red-100 group-hover:bg-red-500 text-red-800 group-hover:text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-pulse transition-all duration-300">
                          {item.badge} new
                        </span>
                      )}
                      <ArrowUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <div className="flex-1 bg-gray-50 group-hover:bg-white/10 rounded-lg p-2 sm:p-3 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-white transition-colors">
                          {item.name === 'Projects' ? 'Manage Projects' : 'View Messages'}
                        </span>
                        <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 group-hover:bg-white/10 rounded-lg p-2 sm:p-3 transition-all duration-300">
                      <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="px-4 sm:px-0 mt-8 sm:mt-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Need to view the public website?</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Check how your content looks to visitors</p>
              </div>
              <Link
                href="/"
                target="_blank"
                className="group inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base flex-shrink-0"
              >
                <span>View Website</span>
                <ArrowUpRightIcon className="ml-1 sm:ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}