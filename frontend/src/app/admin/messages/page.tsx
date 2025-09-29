'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { 
  ArrowLeftIcon, 
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  TrashIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { contactAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'
import ReplyModal from '@/components/admin/ReplyModal'

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  isRead: boolean
  isReplied: boolean
  priority: 'low' | 'medium' | 'high'
  ipAddress?: string
  createdAt: string
  updatedAt: string
}

export default function AdminMessages() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [contactToReply, setContactToReply] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [stats, setStats] = useState({ total: 0, unread: 0, replied: 0 })

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchContacts()
  }, [filter])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const queryParams: any = { limit: 50 }
      if (filter !== 'all') {
        queryParams.isRead = filter === 'read'
      }
      
      const response = await contactAPI.getContacts(queryParams)
      if (response.success) {
        setContacts(response.data || [])
        setStats({
          total: response.pagination?.total || 0,
          unread: response.pagination?.unreadCount || 0,
          replied: response.data?.filter((c: Contact) => c.isReplied).length || 0
        })
      }
    } catch (error) {
      handleApiError(error, 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (contactId: string) => {
    try {
      const response = await contactAPI.markAsRead(contactId)
      if (response.success) {
        fetchContacts()
        toast.success('Message marked as read')
      }
    } catch (error) {
      handleApiError(error, 'Failed to mark as read')
    }
  }

  const handleReply = (contact: Contact) => {
    setContactToReply(contact)
    setShowReplyModal(true)
  }

  const handleReplySuccess = async () => {
    // Mark as replied in the backend
    if (contactToReply) {
      try {
        await contactAPI.markAsReplied(contactToReply._id)
        fetchContacts() // Refresh the list
        toast.success('Contact marked as replied')
      } catch (error) {
        handleApiError(error, 'Failed to mark as replied')
      }
    }
  }

  const handleDelete = async (contact: Contact) => {
    setContactToDelete(contact)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!contactToDelete) return
    
    try {
      const response = await contactAPI.deleteContact(contactToDelete._id)
      if (response.success) {
        toast.success('Message deleted successfully!')
        fetchContacts()
        setShowDeleteConfirm(false)
        setContactToDelete(null)
      }
    } catch (error) {
      handleApiError(error, 'Failed to delete message')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  const getFilteredContacts = () => {
    switch (filter) {
      case 'unread':
        return contacts.filter(c => !c.isRead)
      case 'read':
        return contacts.filter(c => c.isRead)
      default:
        return contacts
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const filteredContacts = getFilteredContacts()

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
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <div className="ml-4 flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                  {stats.total} Total
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {stats.unread} Unread
                </span>
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-2 text-sm font-medium border rounded-l-md ${
                    filter === 'all'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-2 text-sm font-medium border-t border-b ${
                    filter === 'unread'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Unread ({stats.unread})
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-2 text-sm font-medium border rounded-r-md ${
                    filter === 'read'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Read ({stats.total - stats.unread})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <EnvelopeIcon className="w-12 h-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {filter === 'all' ? 'No messages yet' : `No ${filter} messages`}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? 'Contact messages from your website will appear here.' 
                  : `No ${filter} messages found. Try changing the filter.`
                }
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View Website
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact._id} 
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-l-4 ${
                    contact.isRead ? 'border-l-gray-300' : 'border-l-primary'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-full ${
                            contact.isRead ? 'bg-gray-100' : 'bg-primary-50'
                          }`}>
                            {contact.isRead ? (
                              <EnvelopeOpenIcon className={`w-5 h-5 ${
                                contact.isRead ? 'text-gray-500' : 'text-primary'
                              }`} />
                            ) : (
                              <EnvelopeIcon className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <EnvelopeIcon className="w-4 h-4 mr-1" />
                                <a href={`mailto:${contact.email}`} className="hover:text-primary">
                                  {contact.email}
                                </a>
                              </div>
                              <div className="flex items-center">
                                <PhoneIcon className="w-4 h-4 mr-1" />
                                <a href={`tel:${contact.phone}`} className="hover:text-primary">
                                  {contact.phone}
                                </a>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                                {new Date(contact.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-700">Subject:</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contact.subject.includes('Commercial') ? 'bg-blue-100 text-blue-800' :
                              contact.subject.includes('Residential') ? 'bg-green-100 text-green-800' :
                              contact.subject.includes('Emergency') ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {contact.subject}
                            </span>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {contact.ipAddress && (
                              <div className="flex items-center">
                                <MapPinIcon className="w-3 h-3 mr-1" />
                                IP: {contact.ipAddress}
                              </div>
                            )}
                            {contact.isReplied && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckIcon className="w-3 h-3 mr-1" />
                                Replied
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleReply(contact)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <PaperAirplaneIcon className="w-4 h-4 mr-1" />
                              Reply
                            </button>
                            
                            {!contact.isRead && (
                              <button
                                onClick={() => markAsRead(contact._id)}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <EnvelopeOpenIcon className="w-4 h-4 mr-1" />
                                Mark Read
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDelete(contact)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <TrashIcon className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        contact={contactToReply}
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false)
          setContactToReply(null)
        }}
        onSuccess={handleReplySuccess}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && contactToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Delete Message</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the message from "{contactToDelete.name}"? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}