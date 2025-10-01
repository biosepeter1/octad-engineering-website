'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  BuildingStorefrontIcon, 
  UserGroupIcon, 
  ClockIcon,
  HandRaisedIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  HeartIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  BanknotesIcon,
  TrophyIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import { aboutAPI, handleApiError } from '@/lib/api'

interface About {
  _id: string
  companyInfo: string
  mission: string
  vision: string
  values: Array<{
    title: string
    description: string
  }>
  foundedYear?: number
  employeeCount?: number
  contactInfo: {
    phone?: string
    email?: string
    address?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
    }
    socialMedia?: {
      facebook?: string
      twitter?: string
      linkedin?: string
      instagram?: string
    }
  }
}

const defaultAbout: About = {
  _id: 'default',
  companyInfo: 'Octad Engineering Limited is a proudly Nigerian construction company dedicated to delivering world-class building solutions across residential, commercial, and infrastructure projects. We understand Nigeria\'s unique climate challenges, regulatory environment, and cultural preferences, combining this local expertise with international best practices.',
  mission: 'To be Nigeria\'s premier construction partner, delivering superior building solutions that exceed expectations while contributing to national development, job creation, and community growth through quality craftsmanship and innovative engineering.',
  vision: 'To transform Nigeria\'s skylines and communities by becoming the most trusted construction company, known for excellence, integrity, and our commitment to building a stronger, more prosperous nation.',
  values: [
    {
      title: 'Nigerian Excellence',
      description: 'We take pride in our Nigerian heritage, showcasing local talent while maintaining world-class standards in every project we deliver.'
    },
    {
      title: 'Uncompromising Safety',
      description: 'Safety is paramount on every project. We protect our workers, clients, and communities through rigorous safety protocols and training.'
    },
    {
      title: 'Community Impact',
      description: 'Every project contributes to Nigeria\'s growth. We prioritize local employment, skills development, and sustainable construction practices.'
    },
    {
      title: 'Innovation & Adaptation',
      description: 'We embrace cutting-edge technology while adapting to Nigeria\'s climate, regulations, and cultural needs for optimal results.'
    }
  ],
  foundedYear: 2010,
  employeeCount: 45,
  contactInfo: {
    phone: '+234 803 123 4567',
    email: 'info@octadengineering.com.ng',
    address: {
      street: '15 Construction Close, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State',
      zipCode: '101241',
      country: 'Nigeria'
    }
  }
}

export default function AboutPage() {
  const [about, setAbout] = useState<About>(defaultAbout)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutAPI.getAbout()
        if (response.success && response.data) {
          setAbout(response.data)
        }
      } catch (error) {
        console.log('Using default about content')
        // Keep default content if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  const currentYear = new Date().getFullYear()
  const yearsInBusiness = about.foundedYear ? currentYear - about.foundedYear : 13

  const stats = [
    {
      icon: ClockIcon,
      label: 'Years in Business',
      value: yearsInBusiness,
      suffix: '+'
    },
    {
      icon: UserGroupIcon,
      label: 'Team Members',
      value: about.employeeCount || 25,
      suffix: '+'
    },
    {
      icon: BuildingStorefrontIcon,
      label: 'Projects Completed',
      value: 150,
      suffix: '+'
    },
    {
      icon: HandRaisedIcon,
      label: 'Happy Clients',
      value: 98,
      suffix: '%'
    }
  ]

  const valueIcons = [ShieldCheckIcon, LightBulbIcon, HeartIcon, CheckCircleIcon]

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
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1590725140246-20acdee442be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="About Octad Engineering - Nigerian Excellence" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white px-4">
            <div className="max-w-5xl mx-auto">
              <div className="hidden sm:inline-flex items-center justify-center w-20 h-20 bg-primary/20 backdrop-blur-sm border-2 border-white/20 rounded-full mb-8">
                <BuildingStorefrontIcon className="w-10 h-10" />
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 sm:mt-0">
                <span className="block pb-2 sm:pb-4">About</span>
                <span className="block">
                  <span className="text-secondary">Octad </span>
                  <span className="text-white">Engineering</span>
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed">
                Proudly Nigerian. Building excellence, innovation, and lasting relationships across our great nation 
                since {about.foundedYear || 2010}. From Lagos to Kano, from Port Harcourt to Abuja.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <TrophyIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Award Winning</div>
                </div>
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
                    <HandRaisedIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">100% Nigerian</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in" style={{animationDelay: '200ms'}}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary-50 text-primary w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix} 
                      duration={2000 + index * 200}
                      className="inline"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Information - Nigerian Focus */}
        <section className="section-padding bg-gray-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-full"></div>
          
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Nigerian Construction Excellence Team"
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-[350px] sm:h-[400px] lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-primary text-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg">
                  <BuildingStorefrontIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/50 rounded-full"></div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 bg-secondary/30 rounded-full"></div>
              </div>
              
              <div className="mt-8 lg:mt-0">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                  <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Why Choose <span className="text-primary">Octad Engineering</span>?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  As a proudly Nigerian construction company, we understand the unique challenges and opportunities of building in our diverse climate and vibrant culture. We combine international best practices with deep local knowledge to deliver exceptional results.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">CAC Registered & Fully Licensed across Nigeria</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Climate-Resilient Construction Methods</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Local Workforce & Material Sourcing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Transparent Naira Pricing & Payment Plans</span>
                  </div>
                </div>
                
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <Link href="/projects" className="btn-primary px-4 sm:px-6 py-3 text-sm sm:text-base">
                    View Our Portfolio
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline" />
                  </Link>
                  <Link href="/contact" className="btn-outline px-4 sm:px-6 py-3 text-sm sm:text-base">
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Enhanced */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary text-white rounded-full mb-4 sm:mb-6">
                <LightBulbIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our <span className="text-primary">Purpose</span> & <span className="text-secondary">Vision</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Driven by Nigerian values and global standards, we're building more than structures – we're building Nigeria's future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="relative">
                <div className="card hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 border-l-4 border-secondary">
                  <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                    <LightBulbIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {about.mission}
                  </p>
                  {/* Decorative element */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-secondary/20 rounded-full"></div>
                </div>
              </div>
              
              <div className="relative">
                <div className="card hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 border-l-4 border-accent">
                  <div className="bg-gradient-to-r from-accent to-accent/80 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                    <HeartIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {about.vision}
                  </p>
                  {/* Decorative element */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Enhanced */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/5 rounded-full"></div>
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary text-white rounded-full mb-4 sm:mb-6">
                <StarIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our <span className="text-primary">Core Values</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                These principles guide everything we do and define who we are as a Nigerian company 
                committed to excellence, integrity, and community impact.
              </p>
              
              {/* Decorative divider */}
              <div className="flex justify-center items-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                <div className="w-8 h-0.5 sm:w-12 sm:h-1 bg-primary rounded"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full"></div>
                <div className="w-8 h-0.5 sm:w-12 sm:h-1 bg-primary rounded"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {about.values.map((value, index) => {
                const IconComponent = valueIcons[index % valueIcons.length]
                const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-green-500']
                const hoverColors = ['group-hover:bg-secondary', 'group-hover:bg-primary', 'group-hover:bg-primary', 'group-hover:bg-primary']
                
                return (
                  <div 
                    key={index} 
                    className="card text-center group hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 animate-fade-in border-t-4 border-primary"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`${colors[index % colors.length]} text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 ${hoverColors[index % hoverColors.length]} transition-all duration-300 shadow-lg group-hover:scale-110`}>
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                    {/* Decorative corner element */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        {about.contactInfo && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 px-4">
                  Ready to start your next project? We'd love to hear from you.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {about.contactInfo.phone && (
                  <div className="text-center">
                    <div className="bg-primary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Call Us</h3>
                    <a 
                      href={`tel:${about.contactInfo.phone}`} 
                      className="text-sm sm:text-base text-primary hover:text-primary-700 transition-colors"
                    >
                      {about.contactInfo.phone}
                    </a>
                  </div>
                )}
                
                {about.contactInfo.email && (
                  <div className="text-center">
                    <div className="bg-secondary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Email Us</h3>
                    <a 
                      href={`mailto:${about.contactInfo.email}`} 
                      className="text-sm sm:text-base text-primary hover:text-primary-700 transition-colors break-all"
                    >
                      {about.contactInfo.email}
                    </a>
                  </div>
                )}
                
                {about.contactInfo.address && (
                  <div className="text-center">
                    <div className="bg-accent text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Visit Us</h3>
                    <address className="text-xs sm:text-sm text-gray-600 not-italic">
                      {about.contactInfo.address.street && (
                        <div>{about.contactInfo.address.street}</div>
                      )}
                      {(about.contactInfo.address.city || about.contactInfo.address.state || about.contactInfo.address.zipCode) && (
                        <div>
                          {about.contactInfo.address.city}
                          {about.contactInfo.address.city && about.contactInfo.address.state && ', '}
                          {about.contactInfo.address.state} {about.contactInfo.address.zipCode}
                        </div>
                      )}
                    </address>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Nigerian Focus */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full"></div>
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full mb-6 sm:mb-8">
                <HandRaisedIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Let's Build <span className="text-secondary">Nigeria</span> Together
              </h2>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100 px-4">
                Join the hundreds of Nigerian families, businesses, and communities who have trusted us 
                with their construction dreams. Your vision, our expertise, Nigeria's future.
              </p>
              
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">24/7 Nigerian Support</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <BanknotesIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Naira Payment Plans</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <ShieldCheckIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">CAC Guaranteed</div>
                </div>
              </div>
              
              <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center">
                <Link href="/contact" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Start Your Project Today
                  <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 inline" />
                </Link>
                <Link href="/success-stories" className="btn-outline text-base sm:text-lg px-6 sm:px-8 lg:px-10 py-4 sm:py-5 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  See Our Success Stories
                </Link>
              </div>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
                <p className="text-gray-200 text-xs sm:text-sm px-4">
                  🇳🇬 Proudly Nigerian • CAC RC: 123456 • Fully Licensed • ISO Certified • 15+ Years Excellence
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