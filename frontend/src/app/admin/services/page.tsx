'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { ArrowLeftIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { servicesAPI, handleApiError } from '@/lib/api'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const serviceSchema = yup.object({
  title: yup.string().required('Service title is required').max(100, 'Title cannot exceed 100 characters'),
  description: yup.string().required('Description is required').max(1000, 'Description cannot exceed 1000 characters'),
  icon: yup.string().required('Icon is required'),
  isActive: yup.boolean(),
  order: yup.number().min(0, 'Order must be 0 or greater')
})

type ServiceFormData = yup.InferType<typeof serviceSchema>

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ServiceFormData>({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      isActive: true,
      order: 0
    }
  })

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAllServices()
      if (response.success) {
        setServices(response.data || [])
      }
    } catch (error) {
      handleApiError(error, 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleAddService = () => {
    setEditingService(null)
    reset({
      title: '',
      description: '',
      icon: '🏗️',
      isActive: true,
      order: 0
    })
    setShowModal(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    reset({
      title: service.title,
      description: service.description,
      icon: service.icon,
      isActive: service.isActive,
      order: service.order
    })
    setShowModal(true)
  }

  const onSubmit = async (data: ServiceFormData) => {
    setSubmitting(true)
    try {
      let response
      if (editingService) {
        response = await servicesAPI.updateService(editingService._id, data)
        if (response.success) {
          toast.success('Service updated successfully!')
        }
      } else {
        response = await servicesAPI.createService(data)
        if (response.success) {
          toast.success('Service created successfully!')
        }
      }
      
      if (response.success) {
        setShowModal(false)
        fetchServices()
      }
    } catch (error) {
      handleApiError(error, editingService ? 'Failed to update service' : 'Failed to create service')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteService = async (service: Service) => {
    if (!confirm(`Are you sure you want to delete "${service.title}"?`)) {
      return
    }

    try {
      const response = await servicesAPI.deleteService(service._id)
      if (response.success) {
        toast.success('Service deleted successfully!')
        fetchServices()
      }
    } catch (error) {
      handleApiError(error, 'Failed to delete service')
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
            </div>
            <button 
              onClick={handleAddService}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Service
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first construction service.</p>
              <div className="mt-6">
                <button 
                  onClick={handleAddService}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Service
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {services.map((service) => (
                  <li key={service._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-4">{service.icon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {service.title}
                            </h3>
                            {!service.isActive && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            Order: {service.order} • Created: {new Date(service.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          <PencilIcon className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  {...register('title')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="e.g., Residential Construction"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  rows={3}
                  {...register('description')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Describe this service..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Icon *</label>
                <input
                  type="text"
                  {...register('icon')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="🏗️ (emoji or icon class)"
                />
                {errors.icon && (
                  <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Use an emoji or icon class name</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Order</label>
                  <input
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    min="0"
                  />
                  {errors.order && (
                    <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('isActive')}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingService ? 'Updating...' : 'Creating...'}
                    </div>
                  ) : (
                    editingService ? 'Update Service' : 'Create Service'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
