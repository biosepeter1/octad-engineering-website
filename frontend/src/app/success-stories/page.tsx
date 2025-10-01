'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  TrophyIcon,
  StarIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  HomeIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  HandRaisedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { successStoriesAPI, handleApiError } from '@/lib/api'
import { transformProjectsImages } from '@/utils/imageUtils'

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
  metrics: {
    label: string
    value: string
    icon: string
  }[]
  isFeatured: boolean
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const successStories: SuccessStory[] = [
  {
    _id: '1',
    title: 'Lagos Luxury Villa Complex',
    client: 'Chief Adebayo Ogundimu',
    location: 'Victoria Island, Lagos',
    category: 'Residential',
    duration: '14 months',
    budget: '₦450 Million',
    completionYear: 2023,
    description: 'A stunning 8-bedroom luxury villa with modern Nigerian architectural elements, featuring smart home integration, swimming pool, and eco-friendly systems.',
    challenge: 'Building a world-class luxury home in Lagos\' challenging coastal environment while incorporating traditional Nigerian design elements and modern sustainability features.',
    solution: 'We utilized climate-resistant materials, implemented advanced foundation systems for coastal conditions, and seamlessly blended contemporary design with traditional Yoruba architectural motifs.',
    result: 'Delivered a breathtaking villa that became a landmark in Victoria Island, featuring 98% energy efficiency, zero structural issues after 2 years, and winning the 2023 Nigerian Architecture Excellence Award.',
    testimonial: {
      quote: 'Octad Engineering transformed my vision into reality. Their attention to Nigerian cultural details while maintaining international standards is unmatched. This is not just a house, it\'s a masterpiece.',
      author: 'Chief Adebayo Ogundimu',
      position: 'Chairman, Ogundimu Holdings',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Modern Luxury Villa - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Modern Luxury Villa - Side View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Project Value', value: '₦450M', icon: '💰' },
      { label: 'Completion Time', value: '14 Months', icon: '⏱️' },
      { label: 'Client Satisfaction', value: '100%', icon: '❤️' }
    ],
    isFeatured: true,
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Abuja Tech Hub Complex',
    client: 'Nigerian Tech Innovation Center',
    location: 'Central Business District, Abuja',
    category: 'Commercial',
    duration: '18 months',
    budget: '₦1.2 Billion',
    completionYear: 2023,
    description: 'A state-of-the-art 12-story tech innovation center designed to foster Nigeria\'s growing technology ecosystem, featuring flexible workspaces, conference facilities, and cutting-edge infrastructure.',
    challenge: 'Creating Nigeria\'s most advanced technology hub while meeting strict government regulations and incorporating sustainable design for Abuja\'s climate.',
    solution: 'We implemented smart building technologies, designed flexible modular spaces, incorporated solar power systems, and ensured compliance with all FCT development guidelines.',
    result: 'Successfully delivered Nigeria\'s premier tech hub, now home to 200+ startups, achieving LEED Gold certification, and becoming the model for future innovation centers across Africa.',
    testimonial: {
      quote: 'Octad Engineering didn\'t just build our vision - they enhanced it. This facility has become the heartbeat of Nigeria\'s tech revolution. Their expertise in commercial construction is world-class.',
      author: 'Dr. Amina Hassan',
      position: 'Director, Nigerian Tech Innovation Center',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Abuja Tech Hub Complex - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Project Value', value: '₦1.2B', icon: '💰' },
      { label: 'Floors Built', value: '12 Stories', icon: '🏢' },
      { label: 'Jobs Created', value: '500+', icon: '👥' }
    ],
    isFeatured: false,
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Port Harcourt Heritage Restoration',
    client: 'Rivers State Government',
    location: 'Old GRA, Port Harcourt',
    category: 'Renovation',
    duration: '10 months',
    budget: '₦280 Million',
    completionYear: 2022,
    description: 'Restoration of a historic colonial-era government building, preserving its architectural heritage while modernizing it for contemporary government use.',
    challenge: 'Preserving the historical integrity of a 90-year-old colonial structure while upgrading it to modern standards and making it climate-resilient for the Niger Delta environment.',
    solution: 'We employed specialized heritage restoration techniques, sourced period-appropriate materials, and carefully integrated modern systems without compromising the building\'s historical character.',
    result: 'Successfully restored a piece of Nigerian history, extended the building\'s life by 50+ years, won the National Heritage Preservation Award, and created a model for future restoration projects.',
    testimonial: {
      quote: 'Octad Engineering brought our heritage back to life. Their respect for history combined with modern engineering excellence preserved this treasure for future generations.',
      author: 'Hon. Barr. Ezenwo Nyesom Wike',
      position: 'Former Governor, Rivers State',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Restored View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Port Harcourt Heritage Building - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Heritage Value', value: '90 Years', icon: '⏱️' },
      { label: 'Restoration Cost', value: '₦280M', icon: '💰' },
      { label: 'Awards Won', value: '3 Major', icon: '🏆' }
    ],
    isFeatured: false,
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Kano Industrial Complex',
    client: 'Northern Manufacturing Ltd.',
    location: 'Bompai Industrial Area, Kano',
    category: 'Industrial',
    duration: '12 months',
    budget: '₦800 Million',
    completionYear: 2022,
    description: 'A comprehensive industrial manufacturing facility designed for textile production, featuring modern machinery integration, worker amenities, and environmental compliance systems.',
    challenge: 'Building a large-scale industrial facility in Kano\'s challenging climate while ensuring worker comfort, environmental compliance, and integration with local infrastructure.',
    solution: 'We designed climate-optimized structures, implemented advanced ventilation systems, created worker-friendly amenities, and ensured full compliance with Nigerian environmental regulations.',
    result: 'Delivered a world-class manufacturing facility that boosted local employment by 300%, achieved zero environmental violations, and became the template for industrial development in Northern Nigeria.',
    testimonial: {
      quote: 'Octad Engineering understood our industrial needs perfectly. They built more than a factory - they built the foundation for Northern Nigeria\'s manufacturing renaissance.',
      author: 'Alhaji Musa Abdullahi',
      position: 'Chairman, Northern Manufacturing Ltd.',
      rating: 5
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1565515636369-8bed5985c2ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Main View',
        isPrimary: true
      },
      {
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        alt: 'Kano Industrial Complex - Interior View',
        isPrimary: false
      }
    ],
    metrics: [
      { label: 'Factory Size', value: '15,000 sqm', icon: '🏢' },
      { label: 'Jobs Created', value: '300+', icon: '👥' },
      { label: 'Production Capacity', value: '1M units/month', icon: '🔧' }
    ],
    isFeatured: false,
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentStory, setCurrentStory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    fetchSuccessStories()
  }, [])

  const fetchSuccessStories = async () => {
    try {
      const response = await successStoriesAPI.getSuccessStories()
      if (response.success && response.data) {
        // Transform image URLs
        const transformedStories = response.data.map((story: any) => ({
          ...story,
          images: story.images.map((img: any) => ({
            ...img,
            url: img.url
          }))
        }))
        setStories(transformedStories)
      }
    } catch (error) {
      console.log('Using default stories - API not available')
      // Keep the existing successStories as fallback
      setStories(successStories)
    } finally {
      setLoading(false)
    }
  }

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length)
    setCurrentImageIndex(0)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % stories[currentStory].images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + stories[currentStory].images.length) % stories[currentStory].images.length)
  }

  const story = stories.length > 0 ? stories[currentStory] : null

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

  if (!story) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Success Stories Available</h2>
            <p className="text-gray-600">Check back later for inspiring stories from Octad Engineering.</p>
          </div>
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 xs:px-6 sm:px-8">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1590725140246-20acdee442be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Success Stories Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-5xl mx-auto">
              <div className={`inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full mb-6 xs:mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-12'}`}>
                <TrophyIcon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-yellow-300" />
              </div>
              
              <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 xs:mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="block pb-2 xs:pb-4">Our</span>
                <span className="block">
                  <span className="text-yellow-300">Success</span>
                  <span className="text-white"> Stories</span>
                </span>
              </h1>
              
              <p className={`text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-8 xs:mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed px-4 xs:px-0 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Discover how Octad Engineering has transformed dreams into reality across Nigeria. 
                From Lagos to Abuja, from Kano to Port Harcourt - these are our proudest achievements.
              </p>
              
              <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-8 xs:mb-12 max-w-3xl mx-auto px-4 xs:px-0 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <BuildingStorefrontIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-lg xs:text-xl sm:text-2xl font-bold">150+</div>
                  <div className="text-xs xs:text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <StarIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-lg xs:text-xl sm:text-2xl font-bold">98%</div>
                  <div className="text-xs xs:text-sm">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <TrophyIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-lg xs:text-xl sm:text-2xl font-bold">25+</div>
                  <div className="text-xs xs:text-sm">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <MapPinIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-lg xs:text-xl sm:text-2xl font-bold">12</div>
                  <div className="text-xs xs:text-sm">States Served</div>
                </div>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <button 
                  onClick={() => document.getElementById('featured-story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 min-h-[48px]"
                >
                  <PlayCircleIcon className="w-5 h-5 xs:w-6 xs:h-6 mr-2 xs:mr-3" />
                  Explore Our Stories
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-yellow-300/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping"></div>
        </section>

        {/* Featured Story Section */}
        <section id="featured-story" className="section-padding bg-white">
          <div className="container-custom px-4 xs:px-6 sm:px-8">
            <div className="text-center mb-12 xs:mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 bg-primary text-white rounded-full mb-4 xs:mb-6">
                <SparklesIcon className="w-6 h-6 xs:w-8 xs:h-8" />
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 xs:mb-6">
                Featured <span className="text-primary">Success Story</span>
              </h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 xs:px-0">
                Dive deep into one of our most remarkable projects and discover the journey from vision to reality.
              </p>
            </div>

            {/* Story Navigation */}
            <div className="flex justify-center items-center mb-8 xs:mb-12">
              <button
                onClick={prevStory}
                className="p-2 xs:p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 mr-3 xs:mr-4 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeftIcon className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>
              
              <div className="flex space-x-1 xs:space-x-2 mx-4 xs:mx-6">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {setCurrentStory(index); setCurrentImageIndex(0);}}
                    className={`w-2 h-2 xs:w-3 xs:h-3 rounded-full transition-all duration-300 min-h-[24px] min-w-[24px] flex items-center justify-center ${
                      index === currentStory ? 'bg-primary w-6 xs:w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextStory}
                className="p-2 xs:p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 ml-3 xs:ml-4 min-h-[44px] min-w-[44px]"
              >
                <ChevronRightIcon className="w-5 h-5 xs:w-6 xs:h-6" />
              </button>
            </div>

            {/* Story Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 items-center">
              {/* Image Gallery */}
              <div className="relative order-1 lg:order-1">
                <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={story.images[currentImageIndex]?.url}
                    alt={story.images[currentImageIndex]?.alt || story.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {story.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 xs:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 min-h-[40px] min-w-[40px]"
                      >
                        <ChevronLeftIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 xs:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 min-h-[40px] min-w-[40px]"
                      >
                        <ChevronRightIcon className="w-4 h-4 xs:w-5 xs:h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Indicators */}
                  {story.images.length > 1 && (
                    <div className="absolute bottom-3 xs:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 xs:space-x-2">
                      {story.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 min-h-[24px] min-w-[24px] flex items-center justify-center ${
                            index === currentImageIndex ? 'bg-white w-4 xs:w-6' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Category Badge */}
                <div className="absolute -top-2 -left-2 xs:-top-4 xs:-left-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 xs:px-6 xs:py-2 rounded-full font-semibold shadow-lg text-sm xs:text-base">
                  {story.category}
                </div>
              </div>

              {/* Story Details */}
              <div className="order-2 lg:order-2">
                <div className="mb-6">
                  <h3 className="text-2xl xs:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{story.title}</h3>
                  <div className="flex flex-wrap gap-3 xs:gap-4 text-xs xs:text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPinIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-2 text-primary flex-shrink-0" />
                      <span className="truncate">{story.location}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-2 text-primary flex-shrink-0" />
                      Completed {story.completionYear}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-2 text-primary flex-shrink-0" />
                      {story.duration}
                    </div>
                  </div>
                  <p className="text-base xs:text-lg text-gray-600 leading-relaxed mb-6">{story.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 xs:gap-4 mb-6 xs:mb-8">
                  {story.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-2 xs:p-4 bg-gray-50 rounded-xl">
                      <div className="bg-primary text-white w-8 h-8 xs:w-10 xs:h-10 rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-2 text-xs xs:text-sm">
                        {metric.icon}
                      </div>
                      <div className="font-bold text-sm xs:text-lg text-gray-900">{metric.value}</div>
                      <div className="text-xs text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Client Info */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 xs:p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary text-white w-6 h-6 xs:w-8 xs:h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <UserGroupIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-sm xs:text-base truncate">{story.client}</div>
                      <div className="text-xs xs:text-sm text-gray-600 truncate">{story.location}</div>
                    </div>
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600">
                    <span className="font-medium">Project Value:</span> {story.budget}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge, Solution, Result Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom px-4 xs:px-6 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 xs:mb-12">
                <h2 className="text-2xl xs:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
                  The Journey to <span className="text-primary">Success</span>
                </h2>
                <p className="text-base xs:text-lg text-gray-600 px-4 xs:px-0">
                  Every great project starts with challenges. Here's how we turned obstacles into opportunities.
                </p>
              </div>

              <div className="space-y-6 xs:space-y-8">
                {/* Challenge */}
                <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 shadow-lg border-l-4 border-red-500">
                  <div className="flex items-center mb-3 xs:mb-4">
                    <div className="bg-red-500 text-white w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center mr-3 xs:mr-4 flex-shrink-0">
                      <span className="font-bold text-sm xs:text-base">1</span>
                    </div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">The Challenge</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm xs:text-base sm:text-lg pl-13 xs:pl-16">{story.challenge}</p>
                </div>

                {/* Solution */}
                <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-3 xs:mb-4">
                    <div className="bg-blue-500 text-white w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center mr-3 xs:mr-4 flex-shrink-0">
                      <span className="font-bold text-sm xs:text-base">2</span>
                    </div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">Our Solution</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm xs:text-base sm:text-lg pl-13 xs:pl-16">{story.solution}</p>
                </div>

                {/* Result */}
                <div className="bg-white rounded-2xl p-4 xs:p-6 sm:p-8 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-center mb-3 xs:mb-4">
                    <div className="bg-green-500 text-white w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center mr-3 xs:mr-4 flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                    </div>
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">The Result</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm xs:text-base sm:text-lg pl-13 xs:pl-16">{story.result}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-700 text-white">
          <div className="container-custom px-4 xs:px-6 sm:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6 xs:mb-8">
                <span className="text-4xl xs:text-5xl sm:text-6xl text-yellow-300">"</span>
              </div>
              
              <blockquote className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-6 xs:mb-8 px-4 xs:px-0">
                {story.testimonial.quote}
              </blockquote>
              
              <div className="flex items-center justify-center mb-4 xs:mb-6">
                {[...Array(story.testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 xs:w-6 xs:h-6 text-yellow-300 fill-current" />
                ))}
              </div>
              
              <div>
                <div className="text-lg xs:text-xl font-semibold mb-1">{story.testimonial.author}</div>
                <div className="text-primary-200 text-sm xs:text-base">{story.testimonial.position}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Success Stories Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom px-4 xs:px-6 sm:px-8">
            <div className="text-center mb-12 xs:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 xs:mb-6">
                More <span className="text-primary">Success Stories</span>
              </h2>
              <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 xs:px-0">
                Explore our complete portfolio of achievements across Nigeria
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
              {stories.filter((_, index) => index !== currentStory).map((storyItem, index) => {
                const primaryImage = storyItem.images.find(img => img.isPrimary) || storyItem.images[0]
                return (
                  <div
                    key={storyItem._id}
                    onClick={() => {setCurrentStory(stories.findIndex(s => s._id === storyItem._id)); setCurrentImageIndex(0); document.getElementById('featured-story')?.scrollIntoView({ behavior: 'smooth' });}}
                    className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative h-40 xs:h-48">
                      <img
                        src={primaryImage?.url || storyItem.images[0]?.url}
                        alt={primaryImage?.alt || storyItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                      <div className="absolute top-3 left-3 xs:top-4 xs:left-4 bg-primary text-white px-2 py-1 xs:px-3 xs:py-1 rounded-full text-xs xs:text-sm font-medium">
                        {storyItem.category}
                      </div>
                      <div className="absolute bottom-3 right-3 xs:bottom-4 xs:right-4 bg-white/90 text-gray-900 px-2 py-1 xs:px-3 xs:py-1 rounded-full text-xs xs:text-sm font-bold">
                        {storyItem.completionYear}
                      </div>
                    </div>
                    
                    <div className="p-4 xs:p-6">
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {storyItem.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {storyItem.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 min-w-0 flex-1 mr-2">
                          <MapPinIcon className="w-3 h-3 xs:w-4 xs:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{storyItem.location}</span>
                        </div>
                        <div className="text-primary font-semibold text-xs xs:text-sm group-hover:text-secondary transition-colors flex-shrink-0">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-secondary to-secondary-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          
          <div className="container-custom text-center relative z-10 px-4 xs:px-6 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full mb-6 xs:mb-8">
                <HandRaisedIcon className="w-8 h-8 xs:w-10 xs:h-10" />
              </div>
              
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-6">
                Ready to Create Your Own <span className="text-yellow-300">Success Story</span>?
              </h2>
              
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl mb-8 xs:mb-12 max-w-3xl mx-auto leading-relaxed text-gray-100 px-4 xs:px-0">
                Join the hundreds of satisfied clients who have trusted Octad Engineering with their dreams. 
                Let's build something extraordinary together.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 justify-center">
                <Link href="/contact" className="btn-primary text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 bg-white text-secondary hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl min-h-[48px]">
                  Start Your Project Today
                  <ArrowRightIcon className="w-5 h-5 xs:w-6 xs:h-6 ml-2 xs:ml-3 inline" />
                </Link>
                <Link href="/projects" className="btn-outline text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 border-2 border-white text-white hover:bg-white hover:text-secondary transform hover:scale-105 transition-all duration-300 shadow-2xl min-h-[48px]">
                  View All Projects
                </Link>
              </div>
              
              <div className="mt-8 xs:mt-12 pt-6 xs:pt-8 border-t border-white/20">
                <p className="text-gray-200 text-sm xs:text-base">
                  🇳🇬 Proudly Nigerian • 15+ Years Experience • 150+ Projects • 98% Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}