'use client'

import { useState } from 'react'
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Project {
  _id: string
  title: string
  description: string
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  category: string
  location?: string
  client?: string
  startDate?: string
  endDate?: string
  isFeature: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !project) return null

  const { images } = project
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />
      case 'on-hold':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="ml-2 capitalize">{project.status.replace('-', ' ')}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                <TagIcon className="w-4 h-4 mr-1" />
                {project.category}
              </span>
              {project.isFeature && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-white">
                  Featured
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(95vh-100px)] sm:max-h-[calc(95vh-120px)]">
          {/* Image Gallery */}
          <div className="lg:w-2/3 relative bg-gray-900">
            {images.length > 0 && (
              <>
                <div className="relative h-52 sm:h-64 lg:h-full flex items-center justify-center">
                  <img
                    src={images[currentImageIndex]?.url}
                    alt={images[currentImageIndex]?.alt || project.title}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI4MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTM2MCAzNjBMMzgwIDM0MEw0MjAgMzgwTDQ2MCAzNDBMNDgwIDM2MEw0MjAgNDIwTDM2MCA0MjBMMzYwIDM2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR5eHQgeD0iNDAwIiB5PSI0NzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY3NzQ4RiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+'
                    }}
                  />

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 sm:p-2 rounded-full transition-all"
                      >
                        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 sm:p-2 rounded-full transition-all"
                      >
                        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {hasMultipleImages && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex space-x-2 justify-center overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden border-2 transition-all ${index === currentImageIndex
                              ? 'border-white shadow-lg'
                              : 'border-gray-400 hover:border-gray-200'
                            }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIyOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjc3NDhGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWc8L3RleHQ+Cjwvc3ZnPg=='
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Project Details */}
          <div className="lg:w-1/3 p-3 sm:p-4 md:p-6 overflow-y-auto">
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Project Description</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Information</h3>
                <div className="space-y-3">
                  {project.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Location:</span>
                      <span>{project.location}</span>
                    </div>
                  )}

                  {project.client && (
                    <div className="flex items-center text-gray-600">
                      <UserIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="font-medium mr-2">Client:</span>
                      <span>{project.client}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="font-medium mr-2">Duration:</span>
                    <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {(project.createdAt || project.updatedAt) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    {project.createdAt && (
                      <div>
                        <span className="font-medium">Project Added:</span>
                        <span className="ml-2">{formatDate(project.createdAt)}</span>
                      </div>
                    )}
                    {project.updatedAt && (
                      <div>
                        <span className="font-medium">Last Updated:</span>
                        <span className="ml-2">{formatDate(project.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-primary rounded-lg p-4 text-white text-center">
                <h4 className="font-semibold mb-2">Interested in a Similar Project?</h4>
                <p className="text-sm text-blue-100 mb-4">
                  Get in touch with our team to discuss your construction needs.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}