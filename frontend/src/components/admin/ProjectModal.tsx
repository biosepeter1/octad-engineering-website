'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { 
  XMarkIcon, 
  PhotoIcon,
  PlusIcon,
  TrashIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { projectsAPI, uploadAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'

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
}

interface ProjectFormData {
  title: string
  description: string
  status: string
  category: string
  location: string
  client: string
  startDate: string
  endDate: string
  isFeature: boolean
  order: number
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
}

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  status: yup.string().required('Status is required'),
  category: yup.string().required('Category is required'),
  location: yup.string(),
  client: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
  isFeature: yup.boolean(),
  order: yup.number().min(0, 'Order must be 0 or greater'),
  images: yup.array().of(
    yup.object({
      url: yup.string()
        .required('Image URL is required')
        .test('valid-url', 'Must be a valid URL', (value) => {
          if (!value) return false
          // Allow both absolute URLs and localhost URLs
          return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value) || /^http:\/\/localhost:\d+\//.test(value)
        }),
      alt: yup.string().required('Alt text is required').min(1, 'Alt text cannot be empty'),
      isPrimary: yup.boolean()
    })
  ).min(1, 'At least one image is required')
})

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode: 'add' | 'edit'
  project?: Project
}

export default function ProjectModal({ isOpen, onClose, onSuccess, mode, project }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [images, setImages] = useState<Array<{url: string, alt: string, isPrimary: boolean}>>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'planning',
      category: '',
      location: '',
      client: '',
      startDate: '',
      endDate: '',
      isFeature: false,
      order: 0,
      images: []
    }
  })

  useEffect(() => {
    if (mode === 'edit' && project) {
      reset({
        title: project.title,
        description: project.description,
        status: project.status,
        category: project.category,
        location: project.location || '',
        client: project.client || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        isFeature: project.isFeature,
        order: project.order,
        images: project.images
      })
      setImages(project.images)
    } else {
      reset({
        title: '',
        description: '',
        status: 'planning',
        category: '',
        location: '',
        client: '',
        startDate: '',
        endDate: '',
        isFeature: false,
        order: 0,
        images: []
      })
      setImages([])
    }
  }, [mode, project, reset])

  const addImage = () => {
    const newImage = { url: '', alt: '', isPrimary: images.length === 0 }
    const updatedImages = [...images, newImage]
    setImages(updatedImages)
    setValue('images', updatedImages)
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    // If we removed the primary image, make the first one primary
    if (images[index].isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true
    }
    setImages(updatedImages)
    setValue('images', updatedImages)
  }

  const updateImage = (index: number, field: 'url' | 'alt', value: string) => {
    const updatedImages = [...images]
    updatedImages[index][field] = value
    setImages(updatedImages)
    setValue('images', updatedImages)
  }

  const setPrimary = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }))
    setImages(updatedImages)
    setValue('images', updatedImages)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    try {
      setIsUploading(true)
      const response = await uploadAPI.uploadImages(files)
      
      if (response.success && response.data) {
        console.log('🖼️ Upload response data:', response.data)
        const newImages = response.data.map((file: any, index: number) => ({
          url: `http://localhost:5000/api${file.url}`, // Backend returns /uploads/filename, we need /api/uploads/filename
          alt: file.originalName.replace(/\.[^/.]+$/, ''), // Remove file extension for alt text
          isPrimary: images.length === 0 && index === 0 // First image is primary if no images exist
        }))
        
        console.log('🇿️ New images created:', newImages)
        
        const updatedImages = [...images, ...newImages]
        console.log('🖼️ Updated images array:', updatedImages)
        setImages(updatedImages)
        setValue('images', updatedImages)
        
        toast.success(`${files.length} image(s) uploaded successfully!`)
      }
    } catch (error) {
      handleApiError(error, 'Failed to upload images')
    } finally {
      setIsUploading(false)
      // Reset input value so same files can be selected again
      event.target.value = ''
    }
  }

  const onSubmit = async (data: ProjectFormData) => {
    console.log('🚀 Form submission started')
    console.log('📝 Form data:', data)
    console.log('🖼️ Images array:', images)
    
    // Clean up empty images (remove images without URL or alt text)
    const cleanImages = images.filter(img => img.url && img.url.trim() !== '' && img.alt && img.alt.trim() !== '')
    console.log('🧽 Cleaned images:', cleanImages)
    
    try {
      setIsSubmitting(true)
      const projectData = {
        ...data,
        images: cleanImages
      }
      console.log('📦 Project data to send:', projectData)

      let response
      if (mode === 'add') {
        console.log('📡 Calling createProject API...')
        response = await projectsAPI.createProject(projectData)
      } else if (project) {
        console.log('📡 Calling updateProject API...')
        response = await projectsAPI.updateProject(project._id, projectData)
      }
      
      console.log('📨 API Response:', response)

      if (response?.success) {
        console.log('✅ Project operation successful')
        toast.success(`Project ${mode === 'add' ? 'created' : 'updated'} successfully!`)
        onSuccess()
        onClose()
      } else {
        console.log('❌ API response indicates failure:', response)
      }
    } catch (error) {
      console.log('🔴 Error in form submission:', error)
      handleApiError(error, `Failed to ${mode} project`)
    } finally {
      console.log('🏁 Form submission completed, resetting isSubmitting')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'add' ? 'Add New Project' : 'Edit Project'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => {
          console.log('🎯 Form handleSubmit triggered')
          onSubmit(data)
        }, (errors) => {
          console.log('❌ Form validation errors:', errors)
          console.log('🔍 Current images state:', images)
          console.log('🔍 Current form images:', watch('images'))
          
          // Detailed image analysis
          images.forEach((img, index) => {
            console.log(`🔎 Image ${index}:`, {
              url: img.url,
              urlType: typeof img.url,
              urlLength: img.url?.length || 0,
              alt: img.alt,
              altType: typeof img.alt,
              altLength: img.alt?.length || 0,
              isPrimary: img.isPrimary,
              isValidUrl: img.url ? /^https?:\/\//.test(img.url) : false
            })
          })
        })} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                {...register('title')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Project title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Renovation">Renovation</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                {...register('status')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.status ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                {...register('order')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.order ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                placeholder="0"
              />
              {errors.order && (
                <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                {...register('location')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Project location"
              />
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <input
                type="text"
                {...register('client')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Client name"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                {...register('startDate')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                {...register('endDate')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              {...register('description')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Project description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isFeature')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Feature this project on homepage
            </label>
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Images *
              </label>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 cursor-pointer">
                  <PhotoIcon className="w-4 h-4 mr-1" />
                  {isUploading ? 'Uploading...' : 'Upload Images'}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add URL
                </button>
              </div>
            </div>

            {images.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No images added yet</p>
                <p className="text-xs text-gray-400 mb-4">Upload from device or add via URL</p>
                <div className="flex justify-center space-x-3">
                  <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 cursor-pointer">
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Images'}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add URL
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Image {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setPrimary(index)}
                          className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                            image.isPrimary 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
                          }`}
                        >
                          <StarIcon className={`w-3 h-3 mr-1 ${image.isPrimary ? 'fill-current' : ''}`} />
                          {image.isPrimary ? 'Primary' : 'Set Primary'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => updateImage(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Alt Text *
                        </label>
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => updateImage(index, 'alt', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="Image description"
                        />
                      </div>
                    </div>
                    
                    {image.url && (
                      <div className="mt-2">
                        <img
                          src={image.url}
                          alt={image.alt || 'Preview'}
                          className="h-20 w-20 object-cover rounded-md border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => {
                console.log('🔘 Create button clicked', { isSubmitting, formState: e.type })
                // Don't prevent default - let form handle it
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  {mode === 'add' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                mode === 'add' ? 'Create Project' : 'Update Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}