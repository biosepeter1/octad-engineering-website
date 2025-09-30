'use client'

import { useState } from 'react'
import { 
  XMarkIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  TagIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { transformImageUrl } from '@/utils/imageUtils'

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
  order: number
  createdAt: string
  updatedAt: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    )
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
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const currentImage = project.images[currentImageIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            {project.isFeature && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <StarIcon className="w-3 h-3 mr-1 fill-current" />
                Featured
              </span>
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-80px)]">
          {/* Image Gallery */}
          <div className="lg:w-2/3 relative bg-gray-900 flex items-center justify-center min-h-[400px]">
            {project.images.length > 0 ? (
              <>
                <img
                  src={transformImageUrl(currentImage.url)}
                  alt={currentImage.alt || project.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
                  }}
                />
                
                {/* Navigation Arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} of {project.images.length}
                  </div>
                )}
                
                {/* Image Thumbnails */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex space-x-2 max-w-xs overflow-x-auto">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-white shadow-lg' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={transformImageUrl(image.url)}
                          alt={image.alt || `Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/48x48?text=?'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-400 text-center">
                <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <p className="text-lg">No images available</p>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="lg:w-1/3 p-6 overflow-y-auto bg-gray-50">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <TagIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  {project.location && (
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="ml-2 text-sm font-medium">{project.location}</span>
                    </div>
                  )}
                  
                  {project.client && (
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-600">Client:</span>
                      <span className="ml-2 text-sm font-medium">{project.client}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Dates */}
              {(project.startDate || project.endDate) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                  <div className="space-y-3">
                    {project.startDate && (
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-sm text-gray-600">Start Date:</span>
                        <span className="ml-2 text-sm font-medium">
                          {formatDate(project.startDate)}
                        </span>
                      </div>
                    )}
                    
                    {project.endDate && (
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-sm text-gray-600">End Date:</span>
                        <span className="ml-2 text-sm font-medium">
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
                <div className="bg-white p-4 rounded-lg border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{formatDate(project.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Display Order:</span>
                    <span className="font-medium">{project.order}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Images:</span>
                    <span className="font-medium">{project.images.length}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}