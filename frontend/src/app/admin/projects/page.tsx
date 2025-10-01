'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { projectsAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'
import ProjectModal from '@/components/admin/ProjectModal'

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

export default function AdminProjects() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAllProjects()
      if (response.success) {
        setProjects(response.data || [])
      }
    } catch (error) {
      handleApiError(error, 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (project: Project) => {
    setProjectToDelete(project)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!projectToDelete) return
    
    try {
      const response = await projectsAPI.deleteProject(projectToDelete._id)
      if (response.success) {
        toast.success('Project deleted successfully!')
        fetchProjects()
        setShowDeleteConfirm(false)
        setProjectToDelete(null)
      }
    } catch (error) {
      handleApiError(error, 'Failed to delete project')
    }
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setShowEditModal(true)
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
              <Link
                href="/admin/dashboard"
                className="mb-2 sm:mb-0 sm:mr-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700 self-start"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="hidden xs:inline">Dashboard</span>
                <span className="xs:hidden">Back</span>
              </Link>
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Projects Management</h1>
                <span className="ml-2 sm:ml-3 inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white flex-shrink-0">
                  {projects.length} Total
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <PlusIcon className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Add Project</span>
              <span className="xs:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:py-6 sm:px-0">
          {projects.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400">
                <PhotoIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900">No projects found</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 px-4">Get started by creating your first construction project.</p>
              <div className="mt-4 sm:mt-6">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]
                return (
                  <div key={project._id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      {primaryImage ? (
                        <img
                          src={primaryImage.url}
                          alt={primaryImage.alt || project.title}
                          className="h-40 sm:h-48 w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'
                          }}
                        />
                      ) : (
                        <div className="h-40 sm:h-48 w-full bg-gray-200 flex items-center justify-center">
                          <PhotoIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                        {project.isFeature && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)} ml-auto`}>
                          {getStatusIcon(project.status)}
                          <span className="ml-1 capitalize hidden xs:inline">{project.status.replace('-', ' ')}</span>
                          <span className="ml-1 capitalize xs:hidden">{project.status.split('-')[0]}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between mb-2 space-y-1 xs:space-y-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate flex-1 pr-2">{project.title}</h3>
                        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start xs:flex-shrink-0">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {(project.location || project.client) && (
                        <div className="mb-3 sm:mb-4 space-y-1">
                          {project.location && (
                            <p className="text-xs text-gray-500 truncate">
                              <span className="font-medium">Location:</span> {project.location}
                            </p>
                          )}
                          {project.client && (
                            <p className="text-xs text-gray-500 truncate">
                              <span className="font-medium">Client:</span> {project.client}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between pt-3 sm:pt-4 border-t border-gray-100 space-y-2 xs:space-y-0">
                        <div className="text-xs text-gray-500">
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div className="flex items-center space-x-2 self-end xs:self-auto">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-manipulation"
                            title="Edit Project"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProject(project)}
                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 touch-manipulation"
                            title="Delete Project"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && projectToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="relative top-10 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-sm sm:max-w-md shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="mt-2 sm:mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-100">
                <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900 mt-3 sm:mt-4">Delete Project</h3>
              <div className="mt-2 px-2 sm:px-7 py-2 sm:py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{projectToDelete.title}"? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-2 sm:px-4 py-3">
                <div className="flex flex-col xs:flex-row justify-center space-y-2 xs:space-y-0 xs:space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="w-full xs:w-auto px-4 py-2 bg-gray-500 text-white text-sm sm:text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="w-full xs:w-auto px-4 py-2 bg-red-600 text-white text-sm sm:text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 touch-manipulation"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Project Modal - We'll create separate components for these */}
      {showAddModal && (
        <ProjectModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchProjects}
          mode="add"
        />
      )}
      
      {showEditModal && selectedProject && (
        <ProjectModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedProject(null)
          }}
          onSuccess={fetchProjects}
          mode="edit"
          project={selectedProject}
        />
      )}
      
    </div>
  )
}