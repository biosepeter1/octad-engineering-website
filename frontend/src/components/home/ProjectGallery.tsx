'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { transformImageUrl } from '@/utils/imageUtils'

interface GalleryImage {
    url: string
    alt?: string
    title?: string
    category?: string
    status?: string
    description?: string
    projectId?: string
    projectData?: any
    isReal: boolean
}

interface ProjectGalleryProps {
    galleryImages: GalleryImage[]
}

export default function ProjectGallery({ galleryImages }: ProjectGalleryProps) {
    return (
        <section className="section-padding bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                        What We Have <span className="text-primary">Done</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Discover our portfolio of successful projects that showcase our expertise,
                        craftsmanship, and commitment to excellence.
                    </p>
                </div>

                {/* Dynamic Projects Grid - 9 Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {galleryImages.map((image, index) => {
                        const project = image.projectData
                        const isRealProject = image.isReal
                        const displayData = isRealProject ? {
                            title: project?.title,
                            description: project?.description,
                            category: project?.category,
                            status: project?.status,
                            link: `/projects/${image.projectId}`
                        } : {
                            title: image.title,
                            description: image.description,
                            category: image.category,
                            status: image.status,
                            link: '#'
                        }

                        return (
                            <div
                                key={isRealProject ? `${image.projectId}-${index}` : `placeholder-${index}`}
                                className="group cursor-pointer animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => {
                                    if (isRealProject) {
                                        window.location.href = displayData.link
                                    }
                                }}
                            >
                                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                                        <img
                                            src={transformImageUrl(image.url)}
                                            alt={image.alt || displayData.title || 'Project Image'}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                            <div className="text-white">
                                                {displayData.category && (
                                                    <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${displayData.category === 'Residential' ? 'bg-primary' :
                                                        displayData.category === 'Commercial' ? 'bg-secondary' :
                                                            displayData.category === 'Industrial' ? 'bg-purple-500' :
                                                                displayData.category === 'Renovation' ? 'bg-accent' :
                                                                    displayData.category === 'Infrastructure' ? 'bg-green-500' :
                                                                        'bg-gray-500'
                                                        }`}>
                                                        {displayData.category}
                                                    </span>
                                                )}
                                                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-1">
                                                    {displayData.title || 'Construction Project'}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                                                    {displayData.description || 'Professional construction project showcasing our expertise and quality.'}
                                                </p>
                                                <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-gray-300">
                                                    <span className="flex items-center">
                                                        <span className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${displayData.status === 'completed' ? 'bg-green-400' :
                                                            displayData.status === 'in-progress' ? 'bg-blue-400' :
                                                                displayData.status === 'planning' ? 'bg-yellow-400' :
                                                                    'bg-gray-400'
                                                            }`}></span>
                                                        {displayData.status === 'completed' ? 'Completed' :
                                                            displayData.status === 'in-progress' ? 'In Progress' :
                                                                displayData.status === 'planning' ? 'Planning' :
                                                                    'Active'}
                                                    </span>
                                                    {!isRealProject && (
                                                        <span className="ml-2 text-xs opacity-75">Sample</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Decorative corner accent */}
                                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                                        {/* Real project indicator */}
                                        {isRealProject && (
                                            <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                Live Project
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center mt-12 sm:mt-16">
                    <Link href="/projects" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                        View Complete Portfolio
                        <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 ml-2 inline" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
