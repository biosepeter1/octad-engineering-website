'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { 
  XMarkIcon, 
  PaperAirplaneIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { contactAPI } from '@/lib/api'

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

interface ReplyData {
  subject: string
  message: string
}

interface ReplyModalProps {
  contact: Contact | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const schema = yup.object({
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(20, 'Message must be at least 20 characters')
})

// Email templates for different types of inquiries
const getEmailTemplate = (contact: Contact) => {
  const templates = {
    commercial: `Dear ${contact.name},

Thank you for your interest in our commercial construction services at Octad Engineering Limited.

We have received your inquiry regarding: "${contact.subject}"

Our commercial construction team specializes in:
- Office buildings and complexes
- Retail and shopping centers
- Industrial facilities
- Warehouses and distribution centers

We would be delighted to discuss your project requirements in detail. Our team can schedule a site visit and provide you with a comprehensive proposal.

Best regards,
Octad Engineering Limited Team
+234 803 123 4567
info@octadengineering.com
15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria`,

    residential: `Dear ${contact.name},

Thank you for reaching out to Octad Engineering Limited regarding your residential construction needs.

We have received your inquiry about: "${contact.subject}"

Our residential services include:
- Custom home construction
- Home renovations and extensions
- Interior design and finishing
- Architectural planning and design

We would love to help bring your dream home to life. Our experienced team can work with you from initial design through project completion.

Best regards,
Octad Engineering Limited Team
+234 803 123 4567
info@octadengineering.com
15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria`,

    general: `Dear ${contact.name},

Thank you for contacting Octad Engineering Limited.

We have received your message regarding: "${contact.subject}"

Our team has reviewed your inquiry and we appreciate your interest in our construction services. We are committed to delivering quality projects across Nigeria with over 20 years of experience.

We will have a member of our team reach out to you soon to discuss your requirements in detail.

Best regards,
Octad Engineering Limited Team
+234 803 123 4567
info@octadengineering.com
15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria`
  }

  // Determine template based on subject content
  const subject = contact.subject.toLowerCase()
  if (subject.includes('commercial') || subject.includes('office') || subject.includes('business')) {
    return templates.commercial
  } else if (subject.includes('residential') || subject.includes('home') || subject.includes('house')) {
    return templates.residential
  } else {
    return templates.general
  }
}

export default function ReplyModal({ contact, isOpen, onClose, onSuccess }: ReplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ReplyData>({
    resolver: yupResolver(schema)
  })

  // Note: Now using backend Gmail SMTP instead of EmailJS

  // Pre-populate form when contact changes
  useEffect(() => {
    if (contact && isOpen) {
      setValue('subject', `Re: ${contact.subject}`)
      setValue('message', getEmailTemplate(contact))
    }
  }, [contact, isOpen, setValue])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const onSubmit = async (data: ReplyData) => {
    if (!contact) return
    
    setIsSubmitting(true)
    try {
      // Send reply using backend Gmail SMTP
      const response = await contactAPI.sendReply(contact._id, {
        subject: data.subject,
        message: data.message
      })
      
      if (response.success) {
        toast.success('✅ Reply sent successfully!')
        onSuccess() // Refresh the contacts list
        onClose()
      } else {
        throw new Error(response.message || 'Failed to send reply')
      }
    } catch (error: any) {
      console.error('Failed to send reply:', error)
      toast.error('❌ Failed to send reply. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const insertTemplate = (type: 'commercial' | 'residential' | 'general') => {
    if (!contact) return
    const templates = {
      commercial: getEmailTemplate({ ...contact, subject: 'Commercial Construction' }),
      residential: getEmailTemplate({ ...contact, subject: 'Residential Construction' }),
      general: getEmailTemplate(contact)
    }
    setValue('message', templates[type])
  }

  if (!isOpen || !contact) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Reply to {contact.name}
            </h3>
            <p className="text-sm text-gray-500">
              Replying to: {contact.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Original Message Reference */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary">
          <div className="text-sm text-gray-600 mb-2">
            <strong>Original Message:</strong> {new Date(contact.createdAt).toLocaleString()}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Subject:</strong> {contact.subject}
          </div>
          <div className="text-sm text-gray-700 max-h-20 overflow-y-auto">
            <strong>Message:</strong> {contact.message}
          </div>
        </div>

        {/* Quick Templates */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => insertTemplate('commercial')}
            className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            Commercial Template
          </button>
          <button
            type="button"
            onClick={() => insertTemplate('residential')}
            className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
          >
            Residential Template
          </button>
          <button
            type="button"
            onClick={() => insertTemplate('general')}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            General Template
          </button>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              {...register('subject')}
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors ${
                errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter email subject"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              rows={12}
              {...register('message')}
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors resize-none ${
                errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your reply message"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  Send Reply
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}