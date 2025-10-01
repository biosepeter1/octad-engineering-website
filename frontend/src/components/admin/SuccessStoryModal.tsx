'use client'

import React, { useState, useEffect } from 'react'
import { 
  XMarkIcon, 
  PhotoIcon, 
  TrashIcon, 
  PlusIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { successStoriesAPI, uploadAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'

interface SuccessStory {
  _id: string
  title: string
  client: string
  location: string
  category: string
  duration: string
  budget: string
  completionYear: number
  description: string
  challenge: string
  solution: string
  result: string
  testimonial: {
    quote: string
    author: string
    position: string
    rating: number
  }
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  metrics: Array<{
    label: string
    value: string
    icon: string
  }>
  isFeatured: boolean
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface SuccessStoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode: 'add' | 'edit'
  story?: SuccessStory
}

const defaultFormData = {
  title: '',
  client: '',
  location: '',
  category: 'Residential',
  duration: '',
  budget: '',
  completionYear: new Date().getFullYear(),
  description: '',
  challenge: '',
  solution: '',
  result: '',
  testimonial: {
    quote: '',
    author: '',
    position: '',
    rating: 5
  },
  images: [] as Array<{ url: string; alt: string; isPrimary: boolean }>,
  metrics: [
    { label: 'Project Value', value: '', icon: '💰' },
    { label: 'Completion Time', value: '', icon: '⏱️' },
    { label: 'Client Satisfaction', value: '100%', icon: '❤️' }
  ],
  isFeatured: false,
  isActive: true,
  order: 1
}

export default function SuccessStoryModal({ isOpen, onClose, onSuccess, mode, story }: SuccessStoryModalProps) {
  const [formData, setFormData] = useState(defaultFormData)
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (mode === 'edit' && story) {
      setFormData({
        title: story.title,
        client: story.client,
        location: story.location,
        category: story.category,
        duration: story.duration,
        budget: story.budget,
        completionYear: story.completionYear,
        description: story.description,
        challenge: story.challenge,
        solution: story.solution,
        result: story.result,
        testimonial: story.testimonial,
        images: story.images,
        metrics: story.metrics.length > 0 ? story.metrics : defaultFormData.metrics,
        isFeatured: story.isFeatured,
        isActive: story.isActive,
        order: story.order
      })
    } else {
      setFormData(defaultFormData)
    }
    setErrors({})
  }, [mode, story, isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.startsWith('testimonial.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        testimonial: {
          ...prev.testimonial,
          [field]: field === 'rating' ? parseInt(value) : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleMetricChange = (index: number, field: 'label' | 'value' | 'icon', value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }))
  }

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '', icon: '📊' }]
    }))
  }

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadingImages(true)
    try {
      // Upload all files in a single request instead of individual requests
      const response = await uploadAPI.uploadImages(files)
      
      if (response.success && response.data && Array.isArray(response.data)) {
        const newImages = response.data.map((fileData, index) => ({
          url: fileData.fullUrl || fileData.url,
          alt: `${formData.title || 'Success Story'} - Image ${formData.images.length + index + 1}`,
          isPrimary: formData.images.length === 0 && index === 0
        }))

        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }))

        toast.success(`${files.length} image(s) uploaded successfully!`)
      } else {
        throw new Error('Invalid response format from upload API')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      handleApiError(error, 'Failed to upload images')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const setPrimaryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.client.trim()) newErrors.client = 'Client name is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.challenge.trim()) newErrors.challenge = 'Challenge is required'
    if (!formData.solution.trim()) newErrors.solution = 'Solution is required'
    if (!formData.result.trim()) newErrors.result = 'Result is required'
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required'
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required'
    if (!formData.testimonial.quote.trim()) newErrors['testimonial.quote'] = 'Testimonial quote is required'
    if (!formData.testimonial.author.trim()) newErrors['testimonial.author'] = 'Testimonial author is required'
    if (!formData.testimonial.position.trim()) newErrors['testimonial.position'] = 'Testimonial author position is required'

    if (formData.completionYear < 1900 || formData.completionYear > new Date().getFullYear() + 10) {
      newErrors.completionYear = 'Invalid completion year'
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix all validation errors')
      return
    }

    setLoading(true)
    try {
      const response = mode === 'add' 
        ? await successStoriesAPI.createSuccessStory(formData)
        : await successStoriesAPI.updateSuccessStory(story!._id, formData)

      if (response.success) {
        toast.success(`Success story ${mode === 'add' ? 'created' : 'updated'} successfully!`)
        onSuccess()
        onClose()
      }
    } catch (error) {
      handleApiError(error, `Failed to ${mode} success story`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-4 border w-full max-w-4xl shadow-lg rounded-md bg-white mb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'add' ? 'Add New Success Story' : 'Edit Success Story'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter project title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.client ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter client name"
              />
              {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter project location"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Renovation">Renovation</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 12 months"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget *
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.budget ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., ₦450 Million"
              />
              {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Completion Year *
              </label>
              <input
                type="number"
                name="completionYear"
                value={formData.completionYear}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear() + 10}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.completionYear ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.completionYear && <p className="mt-1 text-sm text-red-600">{errors.completionYear}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description of the project"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Challenge, Solution, Result */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenge *
              </label>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.challenge ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="What challenges did this project face?"
              />
              {errors.challenge && <p className="mt-1 text-sm text-red-600">{errors.challenge}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Solution *
              </label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.solution ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="How were the challenges solved?"
              />
              {errors.solution && <p className="mt-1 text-sm text-red-600">{errors.solution}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result *
              </label>
              <textarea
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  errors.result ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="What was the final outcome?"
              />
              {errors.result && <p className="mt-1 text-sm text-red-600">{errors.result}</p>}
            </div>
          </div>

          {/* Testimonial */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Client Testimonial</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quote *
                </label>
                <textarea
                  name="testimonial.quote"
                  value={formData.testimonial.quote}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                    errors['testimonial.quote'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Client testimonial quote"
                />
                {errors['testimonial.quote'] && <p className="mt-1 text-sm text-red-600">{errors['testimonial.quote']}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  name="testimonial.author"
                  value={formData.testimonial.author}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                    errors['testimonial.author'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Testimonial author name"
                />
                {errors['testimonial.author'] && <p className="mt-1 text-sm text-red-600">{errors['testimonial.author']}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  name="testimonial.position"
                  value={formData.testimonial.position}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                    errors['testimonial.position'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Author's position/title"
                />
                {errors['testimonial.position'] && <p className="mt-1 text-sm text-red-600">{errors['testimonial.position']}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        testimonial: { ...prev.testimonial, rating }
                      }))}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`w-6 h-6 ${
                          rating <= formData.testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({formData.testimonial.rating}/5)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Images</h4>
            
            {/* Upload Button */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploadingImages}
              />
              <label
                htmlFor="image-upload"
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
                  uploadingImages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <PhotoIcon className="w-4 h-4 mr-2" />
                {uploadingImages ? 'Uploading...' : 'Upload Images'}
              </label>
            </div>

            {/* Image Grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {image.isPrimary && (
                      <div className="absolute top-1 left-1 bg-primary text-white px-2 py-0.5 rounded text-xs">
                        Primary
                      </div>
                    )}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                    {!image.isPrimary && (
                      <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(index)}
                          className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          Set Primary
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
          </div>

          {/* Metrics */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-gray-900">Project Metrics</h4>
              <button
                type="button"
                onClick={addMetric}
                className="inline-flex items-center px-2 py-1 text-sm bg-primary text-white rounded hover:bg-primary-700"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Metric
              </button>
            </div>

            <div className="space-y-3">
              {formData.metrics.map((metric, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                    placeholder="Metric label"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    placeholder="Metric value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <input
                    type="text"
                    value={metric.icon}
                    onChange={(e) => handleMetricChange(index, 'icon', e.target.value)}
                    placeholder="Icon (emoji)"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">Featured Story</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 disabled:opacity-50"
              disabled={loading || uploadingImages}
            >
              {loading ? 'Saving...' : mode === 'add' ? 'Create Success Story' : 'Update Success Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}