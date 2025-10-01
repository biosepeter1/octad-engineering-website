'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  StarIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { contactAPI, handleApiError } from '@/lib/api'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import GoogleMapsLoader from '@/utils/googleMapsLoader'

// Google Maps types are defined in src/types/google-maps.d.ts

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(20, 'Message must be at least 20 characters')
})

// Google Maps configuration - Nigerian Location
const GOOGLE_MAPS_CONFIG = {
  center: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria coordinates
  zoom: 15,
  address: '15 Adeola Odeku Street, Victoria Island, Lagos 101241, Nigeria'
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  })

  // Load Google Maps with improved singleton loader
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const loader = GoogleMapsLoader.getInstance()
        await loader.load({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'DEMO_KEY',
          libraries: ['places']
        })
        
        // Initialize map after successful load
        initializeMap()
      } catch (error) {
        console.error('Google Maps failed to load:', error)
        setMapLoaded(false)
      }
    }

    const initializeMap = () => {
      if (mapRef.current && window.google && window.google.maps) {
        try {
          const map = new window.google.maps.Map(mapRef.current, {
            center: GOOGLE_MAPS_CONFIG.center,
            zoom: GOOGLE_MAPS_CONFIG.zoom,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f8f9fa' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e1f5fe' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
              }
            ]
          })

          // Add marker
          const marker = new window.google.maps.Marker({
            position: GOOGLE_MAPS_CONFIG.center,
            map: map,
            title: 'Octad Engineering Limited',
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#236BB5"/>
                  <path d="M20 8L28 14V28H12V14L20 8Z" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20)
            }
          })

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: 'Inter', sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #236BB5; font-size: 16px; font-weight: 600;">Octad Engineering Limited</h3>
                <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;">${GOOGLE_MAPS_CONFIG.address}</p>
                <div style="display: flex; gap: 15px; margin-top: 10px;">
                  <a href="tel:+2348031234567" style="color: #236BB5; text-decoration: none; font-size: 14px;">📞 +234 803 123 4567</a>
                  <a href="mailto:info@octadengineering.com" style="color: #236BB5; text-decoration: none; font-size: 14px;">✉️ Email</a>
                </div>
              </div>
            `
          })

          marker.addListener('click', () => {
            infoWindow.open(map, marker)
          })

          // Open info window by default
          infoWindow.open(map, marker)

          mapInstanceRef.current = map
          setMapLoaded(true)
        } catch (error) {
          console.error('Error initializing map:', error)
          setMapLoaded(false)
        }
      }
    }

    // Call the async function
    loadGoogleMaps()
    
    // Cleanup function
    return () => {
      // No need for cleanup with the improved loader
    }
  }, [])

  // EmailJS configuration
  const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_demo',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_demo',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'demo_key'
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Try EmailJS first
      const emailjsResult = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          to_name: 'Octad Engineering Limited'
        },
        EMAILJS_CONFIG.publicKey
      )
      
      if (emailjsResult.status === 200) {
        setSubmitSuccess(true)
        reset()
        toast.success('🎉 Thank you! Your message has been sent successfully via EmailJS. We\'ll get back to you soon!')
      } else {
        throw new Error('EmailJS failed')
      }
    } catch (emailjsError) {
      // Fallback to backend API
      try {
        const response = await contactAPI.createContact(data)
        if (response.success) {
          setSubmitSuccess(true)
          reset()
          toast.success('✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon!')
        } else {
          toast.error('❌ ' + (response.message || 'Failed to send message. Please try again.'))
        }
      } catch (error) {
        toast.error('❌ Failed to send message. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      info: '+234 803 123 4567',
      subInfo: 'Mon - Fri: 8:00 AM - 6:00 PM WAT',
      href: 'tel:+2348031234567'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      info: 'info@octadengineering.com.ng',
      subInfo: 'We respond within 24 hours',
      href: 'mailto:info@octadengineering.com.ng'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Our Lagos Office',
      info: '15 Construction Close, Victoria Island',
      subInfo: 'Lagos State, Nigeria 101241',
      href: 'https://maps.google.com'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      info: 'Monday - Friday: 8:00 AM - 6:00 PM',
      subInfo: 'Saturday: 9:00 AM - 4:00 PM (WAT)',
      href: null
    }
  ]

  const serviceAreas = [
    'Lagos State', 'Abuja FCT', 'Rivers State', 
    'Ogun State', 'Kano State', 'Delta State'
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Enhanced Hero Section - Nigerian Focus */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Contact Octad Engineering - Nigerian Excellence" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container-custom text-center text-white px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 backdrop-blur-sm border-2 border-white/20 rounded-full mb-6 sm:mb-8">
                <HandRaisedIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 animate-fade-in">
                <span className="block pb-2 sm:pb-4">Let's Build</span>
                <span className="block text-secondary animate-slide-up">Nigeria Together</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-8 sm:mb-10 lg:mb-12 text-gray-100 animate-slide-up max-w-4xl mx-auto leading-relaxed">
                Ready to transform your vision into reality? Connect with Nigeria's leading construction experts 
                and let's discuss your next project. From Lagos to Abuja, we're here to serve.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <ShieldCheckIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">CAC Certified</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <StarIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">5-Star Rated</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">24/7 Support</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <BuildingStorefrontIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">200+ Projects</div>
                </div>
              </div>
              
              <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center animate-slide-up">
                <Link 
                  href="tel:+2348031234567" 
                  className="btn-secondary text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 inline" />
                  <span className="hidden xs:inline">Call Now: </span>+234 803 123 4567
                </Link>
                <Link 
                  href="/services" 
                  className="btn-outline text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  View Our Services
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

        {/* Contact Info Cards */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Connect With <span className="text-primary">Nigeria's Best</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Multiple ways to reach us across Nigeria - from Lagos to Abuja, we're always here to serve you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="group">
                  <div className="card text-center transform group-hover:scale-105 transition-all duration-300 animate-slide-up hover:shadow-2xl border-t-4 border-primary group-hover:border-secondary">
                    <div className="bg-gradient-to-br from-primary to-primary-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-secondary group-hover:to-secondary-600 transition-all duration-300 shadow-lg">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-primary hover:text-primary-700 font-semibold block mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg group-hover:underline transition-all break-words"
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">{item.info}</p>
                    )}
                    <p className="text-xs sm:text-sm text-gray-600">{item.subInfo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Enhanced Contact Form */}
              <div className="animate-slide-in-left">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Start Your Nigerian <span className="text-primary">Dream Project</span>
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Ready to build across Nigeria? Share your vision with us and our expert team will respond 
                    within 24 hours to discuss bringing your project to life.
                  </p>
                  <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-3 xs:space-y-0 xs:space-x-4 lg:space-x-6 mt-4 sm:mt-6">
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm font-medium">EmailJS Integrated</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm font-medium">24h Response</span>
                    </div>
                  </div>
                </div>

                {submitSuccess && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 mb-8 animate-fade-in shadow-lg">
                    <div className="flex items-center">
                      <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <CheckCircleIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 text-lg">Message Sent Successfully! 🎉</h4>
                        <p className="text-green-700">We've received your message and will contact you soon with a detailed response.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg border animate-slide-up">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:bg-white'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:bg-white'
                        }`}
                        placeholder="+234 803 123 4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:bg-white'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type / Subject *
                    </label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base ${
                        errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:bg-white'
                      }`}
                    >
                      <option value="">Select project type...</option>
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                      <option value="Project Management">Project Management</option>
                      <option value="Design & Planning">Design & Planning</option>
                      <option value="Maintenance & Repair">Maintenance & Repair</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details / Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none text-base ${
                        errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:bg-white'
                      }`}
                      placeholder="Please describe your project, timeline, budget range, and any specific requirements..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-primary/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3 inline-block"></div>
                        Sending Message via EmailJS...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-6 h-6 mr-3 inline transform group-hover:translate-x-1 transition-transform" />
                        Send Message ✨
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>

              {/* Additional Info */}
              <div className="lg:pl-8 mt-8 lg:mt-0">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Why Choose Octad Engineering Limited?
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Free Consultations</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">Initial project consultation at no cost</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Licensed & Insured</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">Fully licensed with comprehensive insurance</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Quality Guarantee</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">We stand behind all our work</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">24/7 Support</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">Always available for urgent matters</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Service Areas
                  </h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                    {serviceAreas.map((area, index) => (
                      <div key={index} className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary rounded-lg p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Emergency Services</h3>
                  <p className="text-primary-100 mb-4 text-sm sm:text-base">
                    Need immediate assistance? We offer 24/7 emergency construction services across Nigeria for urgent repairs and situations.
                  </p>
                  <Link href="tel:+2348031234567" className="btn-secondary inline-block text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                    <PhoneIcon className="w-4 h-4 mr-2 inline" />
                    Call Emergency Line
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="container-custom">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl xs:text-3xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Visit Our Lagos Office</h2>
              <p className="text-base sm:text-lg text-gray-600 px-4">Find us at our modern facility in the heart of Victoria Island, Lagos</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Office Information */}
              <div className="lg:col-span-1">
                <div className="card">
                  <div className="mb-4 sm:mb-6">
                    <div className="bg-primary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
                    <address className="text-sm sm:text-base text-gray-600 not-italic leading-relaxed">
                      15 Adeola Odeku Street<br />
                      Victoria Island, Lagos 101241<br />
                      Nigeria
                    </address>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Phone</p>
                        <a href="tel:+2348031234567" className="text-primary hover:text-primary-700 text-sm sm:text-base break-words">+234 803 123 4567</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Email</p>
                        <a href="mailto:info@octadengineering.com" className="text-primary hover:text-primary-700 text-sm sm:text-base break-words">info@octadengineering.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Business Hours</p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          Mon-Fri: 8:00 AM - 6:00 PM (WAT)<br />
                          Sat: 9:00 AM - 4:00 PM (WAT)<br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 sm:pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Getting Here</h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                      <li>• Free parking available on-site</li>
                      <li>• Lagos BRT: CMS Station (10 min walk)</li>
                      <li>• Yellow Bus routes available</li>
                      <li>• Wheelchair accessible entrance</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="lg:col-span-2 mt-6 lg:mt-0">
                <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center text-gray-600">
                        <div className="animate-pulse">
                          <MapPinIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p className="text-lg font-medium mb-1">Loading Interactive Map...</p>
                          <p className="text-sm">Please wait while we load the map</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  
                  <div 
                    ref={mapRef} 
                    className="w-full h-full"
                    style={{ minHeight: '384px' }}
                  />
                  
                  {/* Map controls overlay */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          if (mapInstanceRef.current && window.google) {
                            mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1)
                          }
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-600 font-bold text-sm sm:text-base"
                        title="Zoom in"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          if (mapInstanceRef.current && window.google) {
                            mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1)
                          }
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-600 font-bold text-sm sm:text-base"
                        title="Zoom out"
                      >
                        −
                      </button>
                    </div>
                  </div>
                  
                  {/* Directions link overlay */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(GOOGLE_MAPS_CONFIG.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg flex items-center"
                    >
                      <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden xs:inline">Get </span>Directions
                    </a>
                  </div>
                </div>
                
                {/* Map fallback message */}
                {!mapLoaded && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                      Can't load the map? 
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GOOGLE_MAPS_CONFIG.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-700 ml-1"
                      >
                        View on Google Maps
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                Common questions about our Nigerian construction services
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto px-4">
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    question: "How do I get a quote for my project?",
                    answer: "Simply fill out our contact form above or call us directly. We'll schedule a free consultation to discuss your project and provide a detailed quote."
                  },
                  {
                    question: "Are you CAC registered and insured?",
                    answer: "Yes, we are fully CAC registered with the Corporate Affairs Commission and carry comprehensive insurance coverage including professional liability and workers' compensation."
                  },
                  {
                    question: "What areas do you serve?",
                    answer: "We serve Lagos, Abuja, Rivers, Ogun, Kano, Delta, and other major Nigerian states. Contact us to confirm service availability in your specific location."
                  },
                  {
                    question: "How long does a typical project take?",
                    answer: "Project timelines vary depending on size and complexity. During our consultation, we'll provide a detailed timeline specific to your project."
                  }
                ].map((faq, index) => (
                  <div key={index} className="card">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}