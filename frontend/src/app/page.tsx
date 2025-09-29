'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ClockIcon,
  LightBulbIcon,
  HeartIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CogIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import { servicesAPI, projectsAPI, handleApiError } from '@/lib/api'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
}

interface Project {
  _id: string
  title: string
  description: string
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  category: string
  status: string
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  
  // Create gallery images from projects using useMemo
  const galleryImages = useMemo(() => {
    const projectImages = []
    
    // Get only one (primary) image from each project
    projects.forEach(project => {
      if (project.images.length > 0) {
        const primaryImage = project.images.find(img => img.isPrimary && img.url) || 
                           project.images.find(img => img.url)
        if (primaryImage) {
          projectImages.push({ 
            ...primaryImage, 
            projectId: project._id, 
            projectData: project,
            isReal: true
          })
        }
      }
    })
    
    // Fill remaining slots with placeholder data if we have less than 9 projects
    const placeholderImages = [
      {
        url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Luxury Residential Complex',
        title: 'Luxury Residential Complex',
        category: 'Residential',
        status: 'completed',
        description: 'Modern luxury residential complex with sustainable design features.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Corporate Headquarters',
        title: 'Corporate Headquarters', 
        category: 'Commercial',
        status: 'completed',
        description: '15-story corporate headquarters with cutting-edge smart building technology.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Historic Building Restoration',
        title: 'Historic Building Restoration',
        category: 'Renovation',
        status: 'completed', 
        description: 'Careful restoration of 1920s landmark building preserving architectural heritage.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Modern Office Complex',
        title: 'Modern Office Complex',
        category: 'Commercial',
        status: 'completed',
        description: 'State-of-the-art office complex with LEED Gold certification.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Luxury Home Renovation',
        title: 'Luxury Home Renovation',
        category: 'Residential',
        status: 'completed',
        description: 'Complete transformation of family home with modern amenities.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Distribution Warehouse',
        title: 'Distribution Warehouse',
        category: 'Industrial', 
        status: 'completed',
        description: '200,000 sq ft automated distribution center with advanced logistics systems.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Custom Family Home',
        title: 'Custom Family Home',
        category: 'Residential',
        status: 'completed',
        description: 'Beautiful custom-designed family home with modern architecture.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Commercial Building',
        title: 'Commercial Building',
        category: 'Commercial',
        status: 'completed',
        description: 'Multi-purpose commercial building with retail and office spaces.',
        isReal: false
      },
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Industrial Facility',
        title: 'Industrial Facility',
        category: 'Industrial',
        status: 'completed',
        description: 'Advanced manufacturing facility with sustainable design principles.',
        isReal: false
      }
    ]
    
    // Combine real project images with placeholders to make 9 total
    const allImages = [...projectImages]
    const remainingSlots = 9 - projectImages.length
    
    if (remainingSlots > 0) {
      allImages.push(...placeholderImages.slice(0, remainingSlots))
    }
    
    return allImages.slice(0, 9) // Ensure exactly 9 images
  }, [projects])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, projectsResponse] = await Promise.all([
          servicesAPI.getServices(),
          projectsAPI.getProjects({ limit: 9 }) // Get 9 projects for gallery
        ])
        
        if (servicesResponse.success) {
          setServices(servicesResponse.data || [])
        }
        
        if (projectsResponse.success) {
          setProjects(projectsResponse.data || [])
        }
      } catch (error) {
        handleApiError(error, 'Failed to load page content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - Full Screen with Background Image/Video */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Construction Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container-custom text-center text-white px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in">
                <span className="block pb-4">Building Your</span>
                <span className="block animate-slide-up">
                  <span className="text-secondary">Future </span>
                  <span className="bg-primary text-white text-md px-2 rounded-lg inline-block ms-2" style={{fontSize: '70px'}}>Today</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-100 animate-slide-up max-w-4xl mx-auto leading-relaxed">
                Transforming visions into reality with expert engineering, innovative construction solutions, 
                and unwavering commitment to excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
                <Link 
                  href="/contact" 
                  className="btn-secondary text-lg px-10 py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Start Your Project
                  <ArrowRightIcon className="w-6 h-6 ml-3 inline" />
                </Link>
                <Link 
                  href="/projects" 
                  className="btn-outline text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-gray-50 relative overflow-hidden">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Content */}
              <div className="animate-slide-in-left">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Why Choose <span className="text-primary">Octad Engineering</span>?
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    We combine decades of expertise with cutting-edge technology to deliver construction 
                    solutions that exceed expectations and stand the test of time.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start group">
                    <div className="bg-primary text-white w-16 h-16 rounded-xl flex items-center justify-center mr-6 group-hover:bg-secondary transition-colors duration-300 shadow-lg">
                      <WrenchScrewdriverIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Quality Work</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Uncompromising quality standards with rigorous testing and inspection at every phase.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-secondary text-white w-16 h-16 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                      <UserGroupIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Experienced Team</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Certified professionals with over 25 years of combined experience in construction excellence.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-accent text-white w-16 h-16 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                      <ClockIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Timely Delivery</h3>
                      <p className="text-gray-600 leading-relaxed">
                        On-schedule completion guaranteed with detailed project management and milestone tracking.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-green-500 text-white w-16 h-16 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                      <LightBulbIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Innovative Solutions</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Cutting-edge technology and modern construction methods for superior results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-pink-500 text-white w-16 h-16 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                      <HeartIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Customer Focused</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Your vision is our priority with personalized service and constant communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Image */}
              <div className="relative animate-slide-in-right">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Professional Construction Team"
                    className="rounded-2xl shadow-2xl w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-10"></div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-accent rounded-full opacity-30 animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
                What We <span className="text-primary">Do</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                From residential homes to commercial complexes, we deliver comprehensive construction solutions 
                tailored to your unique requirements.
              </p>
            </div>

            <div className="space-y-24">
              {/* Service 1 - Residential Construction */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative animate-slide-in-left">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Residential Construction"
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 rounded-xl shadow-lg">
                    <HomeIcon className="w-12 h-12" />
                  </div>
                </div>
                <div className="animate-slide-in-right">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Residential Construction
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    From custom luxury homes to affordable housing solutions, we create living spaces that 
                    combine functionality, beauty, and sustainability. Our residential projects reflect 
                    modern living standards while respecting traditional architectural values.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Custom Design</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Quality Materials</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Energy Efficient</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Smart Home Ready</span>
                    </div>
                  </div>
                  <Link href="/services" className="btn-primary">
                    Learn More
                    <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                  </Link>
                </div>
              </div>

              {/* Service 2 - Commercial Construction */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="animate-slide-in-left lg:order-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Commercial Construction
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Build your business with our commercial construction expertise. From office buildings 
                    and retail spaces to industrial facilities, we deliver projects that enhance productivity 
                    and create impressive business environments.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Office Buildings</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Retail Spaces</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Warehouses</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Industrial Facilities</span>
                    </div>
                  </div>
                  <Link href="/services" className="btn-primary">
                    Learn More
                    <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                  </Link>
                </div>
                <div className="relative animate-slide-in-right lg:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Commercial Construction"
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-secondary text-white p-6 rounded-xl shadow-lg">
                    <BuildingOfficeIcon className="w-12 h-12" />
                  </div>
                </div>
              </div>

              {/* Service 3 - Renovation & Remodeling */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative animate-slide-in-left">
                  <img 
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Renovation & Remodeling"
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-accent text-white p-6 rounded-xl shadow-lg">
                    <PaintBrushIcon className="w-12 h-12" />
                  </div>
                </div>
                <div className="animate-slide-in-right">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Renovation & Remodeling
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Transform your existing spaces with our expert renovation services. Whether it's updating 
                    a single room or completely reimagining your property, we breathe new life into old structures 
                    while preserving their character.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Kitchen Remodels</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Bathroom Upgrades</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Room Additions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Historic Restoration</span>
                    </div>
                  </div>
                  <Link href="/services" className="btn-primary">
                    Learn More
                    <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                  </Link>
                </div>
              </div>

              {/* Service 4 - Project Management */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="animate-slide-in-left lg:order-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Project Management
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Comprehensive project management ensures your construction runs smoothly from conception 
                    to completion. Our experienced managers coordinate every aspect, maintaining timeline, 
                    budget, and quality standards.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Timeline Control</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Budget Management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Quality Assurance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Risk Mitigation</span>
                    </div>
                  </div>
                  <Link href="/services" className="btn-primary">
                    Learn More
                    <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                  </Link>
                </div>
                <div className="relative animate-slide-in-right lg:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Project Management"
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-6 rounded-xl shadow-lg">
                    <CogIcon className="w-12 h-12" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-20">
              <Link href="/services" className="btn-primary text-lg px-8 py-4">
                Explore All Services
                <ArrowRightIcon className="w-6 h-6 ml-2 inline" />
              </Link>
            </div>
          </div>
        </section>

        {/* What We Have Done - Projects Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What We Have <span className="text-primary">Done</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our portfolio of successful projects that showcase our expertise, 
                craftsmanship, and commitment to excellence.
              </p>
            </div>

            {/* Dynamic Projects Grid - 9 Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => {
                // Handle both real projects and placeholder images
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
                  link: '#' // Placeholder projects don't have real links
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
                    <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={image.url}
                          alt={image.alt || displayData.title || 'Project Image'}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                          <div className="text-white">
                            {displayData.category && (
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                                displayData.category === 'Residential' ? 'bg-primary' :
                                displayData.category === 'Commercial' ? 'bg-secondary' :
                                displayData.category === 'Industrial' ? 'bg-purple-500' :
                                displayData.category === 'Renovation' ? 'bg-accent' :
                                displayData.category === 'Infrastructure' ? 'bg-green-500' :
                                'bg-gray-500'
                              }`}>
                                {displayData.category}
                              </span>
                            )}
                            <h3 className="text-xl font-bold mb-2 line-clamp-1">
                              {displayData.title || 'Construction Project'}
                            </h3>
                            <p className="text-sm text-gray-200 line-clamp-2">
                              {displayData.description || 'Professional construction project showcasing our expertise and quality.'}
                            </p>
                            <div className="mt-3 flex items-center text-sm text-gray-300">
                              <span className="flex items-center">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                  displayData.status === 'completed' ? 'bg-green-400' :
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
                                <span className="ml-2 text-xs opacity-75">Sample Project</span>
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

            <div className="text-center mt-16">
              <Link href="/projects" className="btn-primary text-lg px-8 py-4">
                View Complete Portfolio
                <ArrowRightIcon className="w-6 h-6 ml-2 inline" />
              </Link>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted by <span className="text-primary">Industry Leaders</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're proud to work with some of the most respected names in construction, 
                real estate, and development.
              </p>
            </div>
            
            {/* Marquee Container */}
            <div className="relative overflow-hidden bg-gray-50 rounded-2xl py-12">
              <div className="flex space-x-16 animate-marquee">
                {/* Client Logos Row 1 */}
                <div className="flex items-center justify-center min-w-max space-x-16">
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">ACME Corp</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">BuildPro</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Metro Dev</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Urban Plus</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Elite Build</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Prime Co</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Apex Ltd</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Nova Group</span>
                    </div>
                  </div>
                </div>
                
                {/* Duplicate for seamless loop */}
                <div className="flex items-center justify-center min-w-max space-x-16">
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">ACME Corp</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">BuildPro</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Metro Dev</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Urban Plus</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Elite Build</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Prime Co</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Apex Ltd</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-lg">Nova Group</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="text-center">
                <AnimatedCounter 
                  end={500} 
                  suffix="+" 
                  duration={2500}
                  className="text-4xl md:text-5xl font-bold text-primary mb-2"
                />
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={25} 
                  suffix="+" 
                  duration={2000}
                  className="text-4xl md:text-5xl font-bold text-secondary mb-2"
                />
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={98} 
                  suffix="%" 
                  duration={2200}
                  className="text-4xl md:text-5xl font-bold text-accent mb-2"
                />
                <div className="text-gray-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={50} 
                  suffix="+" 
                  duration={1800}
                  className="text-4xl md:text-5xl font-bold text-green-500 mb-2"
                />
                <div className="text-gray-600 font-medium">Expert Team Members</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Let's bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Get Free Quote
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link href="tel:(555)123-4567" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                Call Now: (555) 123-4567
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}