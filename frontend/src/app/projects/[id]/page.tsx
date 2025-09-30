"use client"

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { projectsAPI, handleApiError } from '@/lib/api'
import { transformProjectImages, transformImageUrl } from '@/utils/imageUtils'

interface ProjectImage {
  url: string
  alt: string
  isPrimary: boolean
}

interface Project {
  _id: string
  title: string
  description: string
  images: ProjectImage[]
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  category: string
  location?: string
  client?: string
  startDate?: string
  endDate?: string
  isFeature?: boolean
}

const statusStyles: Record<Project['status'], string> = {
  'planning': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'on-hold': 'bg-red-100 text-red-800'
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>()
  const projectId = params?.id
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return
      try {
        const response = await projectsAPI.getProject(projectId)
        if (response.success && response.data) {
          // Transform localhost URLs to production URLs
          const transformedProject = transformProjectImages(response.data)
          setProject(transformedProject)
        } else {
          // If the API returns nothing, show 404
          setProject(null)
        }
      } catch (error) {
        handleApiError(error, 'Failed to load project details')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
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

  if (!project) {
    notFound()
  }

  const images = project?.images?.length ? project.images : [
    {
      url: 'https://via.placeholder.com/1200x800?text=Project+Image',
      alt: project?.title || 'Project image placeholder',
      isPrimary: true
    }
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with Overlay */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end">
          <div className="absolute inset-0">
            <img
              src={transformImageUrl(images[activeImageIndex]?.url)}
              alt={images[activeImageIndex]?.alt || project?.title || 'Project Image'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="relative container-custom pb-10 text-white">
            <Link href="/projects" className="inline-flex items-center text-sm mb-4 hover:underline">
              <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Projects
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
              {project?.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white">
                {project?.category}
              </span>
              {project?.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[project.status]}`}>
                  {project.status.replace('-', ' ')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-custom section-padding grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Gallery and Description */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-[480px] bg-gray-100">
                <img
                  src={transformImageUrl(images[activeImageIndex]?.url)}
                  alt={images[activeImageIndex]?.alt || 'Project image'}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-3 bg-gray-50">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-20 rounded-lg overflow-hidden border ${idx === activeImageIndex ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'}`}
                      title={img.alt}
                    >
                      <img
                        src={transformImageUrl(img.url)}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Image' }}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-gray-500 flex items-center gap-2"><PhotoIcon className="w-4 h-4" /> Only one image available</div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">About this project</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project?.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {project?.status && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    Status: <span className="font-medium capitalize ml-1">{project.status.replace('-', ' ')}</span>
                  </div>
                )}
                {project?.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                    Location: <span className="font-medium ml-1">{project.location}</span>
                  </div>
                )}
                {(project?.startDate || project?.endDate) && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CalendarIcon className="w-5 h-5 text-secondary" />
                    Timeline: <span className="font-medium ml-1">{formatDate(project?.startDate)} - {formatDate(project?.endDate)}</span>
                  </div>
                )}
                {project?.client && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BuildingStorefrontIcon className="w-5 h-5 text-accent" />
                    Client: <span className="font-medium ml-1">{project.client}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Project Info</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex justify-between border-b pb-2"><span className="text-gray-500">Category</span><span className="font-medium">{project?.category}</span></li>
                <li className="flex justify-between border-b pb-2"><span className="text-gray-500">Status</span><span className="font-medium capitalize">{project?.status.replace('-', ' ')}</span></li>
                {project?.location && (<li className="flex justify-between border-b pb-2"><span className="text-gray-500">Location</span><span className="font-medium">{project.location}</span></li>)}
                {project?.client && (<li className="flex justify-between border-b pb-2"><span className="text-gray-500">Client</span><span className="font-medium">{project.client}</span></li>)}
                {(project?.startDate || project?.endDate) && (<li className="flex justify-between border-b pb-2"><span className="text-gray-500">Timeline</span><span className="font-medium">{formatDate(project?.startDate)} - {formatDate(project?.endDate)}</span></li>)}
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="btn-primary w-full block text-center">Start a Similar Project</Link>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Need Expert Builders?</h3>
              <p className="text-white/90 text-sm mb-4">Our team can help you plan and execute a project like this—on time and on budget.</p>
              <Link href="/services" className="btn-outline border-white text-white hover:bg-white hover:text-primary">Explore Services</Link>
            </div>
          </aside>
        </section>

        {/* Related Projects (placeholder: link back) */}
        <section className="container-custom pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">More Projects</h3>
              <Link href="/projects" className="text-primary hover:underline">View all</Link>
            </div>
            <p className="text-gray-600 text-sm">Browse our portfolio to see more work like this.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
