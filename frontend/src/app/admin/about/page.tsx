'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function AdminAbout() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/admin/dashboard"
                className="mr-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">About Page Management</h1>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700">
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Content
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">About page content</h3>
            <p className="mt-1 text-sm text-gray-500">Manage your company information, mission, and values.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit About Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}