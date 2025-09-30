'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import AnimatedCounter from '@/components/AnimatedCounter'
import { projectsAPI, handleApiError } from '@/lib/api'
import { transformProjectsImages, transformImageUrl } from '@/utils/imageUtils'

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
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

interface ApiPaginationInfo {
  page?: number
  limit?: number
  total?: number
  pages?: number
  unreadCount?: number
}

const defaultProjects: Project[] = [
  {
    _id: 'default1',
    title: 'Modern Residential Complex',
    description: 'A stunning 3-story residential complex featuring modern architecture, energy-efficient systems, and premium finishes. This project showcases our expertise in contemporary residential construction.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        alt: 'Modern Residential Complex',
        isPrimary: true
      }
    ],
    status: 'completed',
    category: 'Residential',
    location: 'Downtown District',
    client: 'Metro Housing Corp',
    startDate: '2023-01-15',
    endDate: '2023-08-30',
    isFeature: true
  },
  {
    _id: 'default2',
    title: 'Corporate Office Building',
    description: 'A 10-story commercial office building with state-of-the-art facilities, sustainable design, and flexible workspace solutions for modern businesses.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        alt: 'Corporate Office Building',
        isPrimary: true
      }
    ],
    status: 'completed',
    category: 'Commercial',
    location: 'Business District',
    client: 'TechCorp Industries',
    startDate: '2022-06-01',
    endDate: '2023-05-15',
    isFeature: true
  },
  {
    _id: 'default3',
    title: 'Shopping Center Renovation',
    description: 'Complete renovation of a 50,000 sq ft shopping center, including modernization of storefronts, common areas, and infrastructure upgrades.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop',
        alt: 'Shopping Center Renovation',
        isPrimary: true
      }
    ],
    status: 'completed',
    category: 'Renovation',
    location: 'Suburban Mall',
    client: 'Retail Properties Inc',
    startDate: '2023-03-01',
    endDate: '2023-12-20',
    isFeature: false
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(defaultProjects)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 9,
    total: 3,
    pages: 1
  })

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const statuses = ['All', 'completed', 'in-progress', 'planning', 'on-hold']

  const statusLabels = {
    'All': 'All Projects',
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'planning': 'Planning',
    'on-hold': 'On Hold'
  }

  const statusColors = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'planning': 'bg-yellow-100 text-yellow-800',
    'on-hold': 'bg-red-100 text-red-800'
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getProjects({
          limit: pagination.limit,
          page: currentPage
        })
        
        if (response.success && response.data) {
          // Transform localhost URLs to production URLs
          const transformedProjects = transformProjectsImages(response.data) as Project[]
          setProjects(transformedProjects)
          setFilteredProjects(transformedProjects)
          if (response.pagination) {
            setPagination({
              page: response.pagination.page || 1,
              limit: response.pagination.limit || 9,
              total: response.pagination.total || 0,
              pages: response.pagination.pages || 1
            })
          }
        }
      } catch (error) {
        console.log('Using default projects')
        // Keep default projects if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [currentPage])

  // Filter projects based on search term, category, and status
  useEffect(() => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project => project.status === selectedStatus)
    }

    setFilteredProjects(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, selectedCategory, selectedStatus, projects])

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary-800 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container-custom section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Our <span className="text-secondary">Projects</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Explore our portfolio of completed construction projects and see our craftsmanship in action
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-secondary">
                  Start Your Project
                  <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link href="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b">
          <div className="container-custom py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{statusLabels[status as keyof typeof statusLabels]}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <BuildingStorefrontIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Projects Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                    setSelectedStatus('All')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => {
                    const primaryImage = project.images.find(img => img.isPrimary) || project.images[0]
                    return (
                      <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-construction transition-shadow">
                        {/* Project Image */}
                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                          {primaryImage ? (
                            <img
                              src={transformImageUrl(primaryImage.url)}
                              alt={primaryImage.alt || project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Project+Image'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <BuildingStorefrontIcon className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>

                          {/* Feature Badge */}
                          {project.isFeature && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                          {/* Category */}
                          <div className="text-sm text-secondary font-medium mb-2">
                            {project.category}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          {/* Project Details */}
                          <div className="space-y-2 mb-4">
                            {project.location && (
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                {project.location}
                              </div>
                            )}
                            {(project.startDate || project.endDate) && (
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                              </div>
                            )}
                          </div>

                          {/* View More Button */}
                          <button 
                            onClick={() => {
                              setSelectedProject(project)
                              setShowDetailsModal(true)
                            }}
                            className="w-full btn-outline text-sm py-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                          >
                            <EyeIcon className="w-4 h-4 mr-2 inline" />
                            View Details
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          page === currentPage
                            ? 'bg-primary text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Project Statistics
              </h2>
              <p className="text-xl text-gray-600">
                Our track record speaks for itself
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter 
                    end={projects.length} 
                    suffix="+" 
                    duration={2000}
                    className="inline"
                  />
                </div>
                <p className="text-gray-600">Total Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">
                  <AnimatedCounter 
                    end={projects.filter(p => p.status === 'completed').length} 
                    suffix="" 
                    duration={2200}
                    className="inline"
                  />
                </div>
                <p className="text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  <AnimatedCounter 
                    end={projects.filter(p => p.status === 'in-progress').length} 
                    suffix="" 
                    duration={2400}
                    className="inline"
                  />
                </div>
                <p className="text-gray-600">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-600 mb-2">
                  <AnimatedCounter 
                    end={categories.length - 1} 
                    suffix="" 
                    duration={1800}
                    className="inline"
                  />
                </div>
                <p className="text-gray-600">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss your construction needs and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Get Free Quote
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link href="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Project Details Modal */}
      {showDetailsModal && selectedProject && (
        <ProjectDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedProject(null)
          }}
          project={selectedProject}
        />
      )}
    </>
  )
}
