'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  LightBulbIcon,
  CogIcon,
  PaintBrushIcon,
  BanknotesIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import { servicesAPI, handleApiError } from '@/lib/api'

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  features?: string[]
  isActive: boolean
}

const defaultServices: Service[] = [
  {
    _id: 'default1',
    title: 'Residential Construction',
    description: 'Premium home construction services tailored for Nigerian families, featuring modern designs with traditional elements that reflect our rich cultural heritage.',
    icon: 'home',
    features: [
      'Modern Nigerian Home Designs',
      'Climate-Appropriate Construction',
      'Traditional & Contemporary Fusion',
      'Energy-Efficient Systems',
      'Luxury Finishing Options',
      'Compound Development',
      'Security Features Integration'
    ],
    isActive: true
  },
  {
    _id: 'default2',
    title: 'Commercial & Office Buildings',
    description: 'State-of-the-art commercial construction for Nigeria\'s growing business sector, designed to meet international standards while respecting local business culture.',
    icon: 'building',
    features: [
      'Modern Office Complexes',
      'Shopping Centers & Malls',
      'Hotels & Hospitality',
      'Banking & Financial Centers',
      'Educational Institutions',
      'Healthcare Facilities',
      'Industrial Complexes'
    ],
    isActive: true
  },
  {
    _id: 'default3',
    title: 'Infrastructure Development',
    description: 'Contributing to Nigeria\'s infrastructure growth with roads, bridges, utilities, and public facilities that connect communities and drive economic development.',
    icon: 'infrastructure',
    features: [
      'Road Construction & Maintenance',
      'Bridge & Flyover Construction',
      'Water Treatment Facilities',
      'Power Infrastructure',
      'Telecommunication Towers',
      'Public Transportation Facilities',
      'Urban Planning Projects'
    ],
    isActive: true
  },
  {
    _id: 'default4',
    title: 'Renovation & Modernization',
    description: 'Transform existing properties with modern amenities while preserving architectural heritage and cultural significance important to Nigerian communities.',
    icon: 'renovation',
    features: [
      'Historic Building Restoration',
      'Modern Kitchen & Bathroom Upgrades',
      'Energy Efficiency Improvements',
      'Smart Home Integration',
      'Structural Reinforcement',
      'Accessibility Modifications',
      'Cultural Heritage Preservation'
    ],
    isActive: true
  },
  {
    _id: 'default5',
    title: 'Design & Engineering',
    description: 'Innovative architectural and engineering solutions that blend international best practices with Nigerian environmental conditions and cultural preferences.',
    icon: 'design',
    features: [
      'Architectural Design & Planning',
      'Structural Engineering',
      'MEP Systems Design',
      '3D Visualization & Modeling',
      'Building Information Modeling (BIM)',
      'Environmental Impact Assessment',
      'Permit & Regulatory Compliance'
    ],
    isActive: true
  },
  {
    _id: 'default6',
    title: 'Maintenance & Facilities Management',
    description: 'Comprehensive property maintenance services ensuring longevity and optimal performance in Nigeria\'s challenging climate conditions.',
    icon: 'maintenance',
    features: [
      'Preventive Maintenance Programs',
      'Emergency Repair Services',
      'HVAC & Electrical Systems',
      'Plumbing & Water Systems',
      'Structural Health Monitoring',
      'Security Systems Maintenance',
      '24/7 Emergency Response'
    ],
    isActive: true
  }
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getServices()
        if (response.success && response.data) {
          setServices(response.data)
        }
      } catch (error) {
        console.log('Using default services')
        // Keep default services if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

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
              src="https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Modern Nigerian Construction" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="block pb-4">Building</span>
                <span className="block">
                  <span className="text-secondary">Nigeria's </span>
                  <span className="text-white">Future</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed">
                Comprehensive construction and engineering services tailored for Nigeria's unique climate, 
                culture, and architectural requirements. Building excellence across residential, commercial, and infrastructure projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="btn-secondary text-lg px-10 py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Get Free Quote
                  <ArrowRightIcon className="w-6 h-6 ml-3 inline" />
                </Link>
                <Link href="/projects" className="btn-outline text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  View Our Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted Across Nigeria
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to excellence has earned us the trust of clients nationwide
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <AnimatedCounter 
                  end={200} 
                  suffix="+" 
                  duration={2500}
                  className="text-4xl md:text-5xl font-bold text-primary mb-2"
                />
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={15} 
                  suffix="+" 
                  duration={2000}
                  className="text-4xl md:text-5xl font-bold text-secondary mb-2"
                />
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={25} 
                  suffix="" 
                  duration={2200}
                  className="text-4xl md:text-5xl font-bold text-accent mb-2"
                />
                <div className="text-gray-600 font-medium">States Served</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  end={95} 
                  suffix="%" 
                  duration={1800}
                  className="text-4xl md:text-5xl font-bold text-green-500 mb-2"
                />
                <div className="text-gray-600 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Expertise - Enhanced Section */}
        <section className="section-padding bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full"></div>
          <div className="container-custom relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-6">
                <BuildingStorefrontIcon className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Expertise</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From traditional Nigerian architecture to modern commercial complexes, we deliver 
                construction solutions that combine international quality standards with local expertise and cultural understanding.
              </p>
              
              {/* Decorative Elements */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <div className="w-12 h-1 bg-primary rounded"></div>
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-12 h-1 bg-primary rounded"></div>
              </div>
            </div>
            
            <div className="space-y-20">
              {services.filter(service => service.isActive).map((service, index) => {
                const getServiceIcon = (iconType: string) => {
                  switch (iconType) {
                    case 'home': return <HomeIcon className="w-12 h-12" />
                    case 'building': return <BuildingStorefrontIcon className="w-12 h-12" />
                    case 'infrastructure': return <CogIcon className="w-12 h-12" />
                    case 'renovation': return <PaintBrushIcon className="w-12 h-12" />
                    case 'design': return <LightBulbIcon className="w-12 h-12" />
                    case 'maintenance': return <WrenchScrewdriverIcon className="w-12 h-12" />
                    default: return <BuildingStorefrontIcon className="w-12 h-12" />
                  }
                }
                
                const getServiceImage = (iconType: string) => {
                  switch (iconType) {
                    case 'home': return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    case 'building': return 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    case 'infrastructure': return 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    case 'renovation': return 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    case 'design': return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    case 'maintenance': return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    default: return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  }
                }
                
                return (
                  <div key={service._id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`} style={{ animationDelay: `${index * 200}ms` }}>
                    {/* Image Section */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-102 transition-all duration-500">
                        <img 
                          src={getServiceImage(service.icon)}
                          alt={service.title}
                          className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                        <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                          {getServiceIcon(service.icon)}
                        </div>
                        {/* Decorative corner elements */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 bg-secondary/20 rounded-full"></div>
                      </div>
                      {/* Background decoration */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10"></div>
                    </div>
                    
                    {/* Content Section */}
                    <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <div className="max-w-xl">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                          {getServiceIcon(service.icon)}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        
                        {service.features && service.features.length > 0 && (
                          <div className="mb-8">
                            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Our Capabilities:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.features.slice(0, 6).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-gray-700">
                                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                  <span className="text-sm font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                            {service.features.length > 6 && (
                              <div className="mt-3 text-sm text-gray-500">
                                +{service.features.length - 6} more specialized services
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href="/contact" className="btn-primary">
                            Get Quote
                            <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                          </Link>
                          <Link href="/projects" className="btn-outline">
                            View Examples
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Nigerian Focus */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1590725140246-20acdee442be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Nigerian Construction Excellence"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 rounded-xl shadow-lg">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Building <span className="text-primary">Excellence</span> in Nigeria
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  As a proudly Nigerian construction company, we understand the unique challenges and opportunities 
                  of building in our climate, working with local materials, and serving our communities with integrity and excellence.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-secondary transition-colors">
                      <ShieldCheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">CAC Registered & Fully Licensed</h3>
                      <p className="text-gray-600">Certified with Corporate Affairs Commission and fully licensed by relevant Nigerian authorities with comprehensive insurance coverage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-secondary text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                      <ClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Weather-Resilient Construction</h3>
                      <p className="text-gray-600">Specialized expertise in building for Nigeria's tropical climate with materials and methods that withstand heavy rains and high temperatures.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-accent text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                      <BanknotesIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Transparent Naira Pricing</h3>
                      <p className="text-gray-600">Clear, upfront pricing in Naira with no hidden costs. We work within Nigerian budgets and offer flexible payment terms.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-green-500 text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                      <UserGroupIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Local Workforce Development</h3>
                      <p className="text-gray-600">Committed to training and employing Nigerian workers, contributing to local economic growth and skill development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Nigerian Context */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container-custom">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From initial consultation to project completion, we follow a proven methodology that ensures 
                quality delivery while navigating Nigeria's regulatory environment and cultural considerations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Consultation & Site Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive discussion of your vision, budget analysis, site evaluation, and understanding of local regulations and requirements.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-secondary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Design & Permits</h3>
                <p className="text-gray-600 leading-relaxed">
                  Architectural planning with Nigerian building codes compliance, permit acquisition, and approval from relevant state authorities.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-accent text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Construction Execution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quality construction with regular progress updates, safety compliance, and coordination with local suppliers and craftsmen.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Handover & Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Final inspection, documentation, project handover with warranties, and ongoing maintenance support services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas - Nigerian States */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Serving <span className="text-primary">Nigeria</span> Nationwide
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From Lagos to Abuja, Port Harcourt to Kano, we bring our expertise to communities across Nigeria, 
                contributing to the nation's infrastructure and development goals.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {[
                'Lagos State', 'Abuja FCT', 'Rivers State', 'Kano State', 'Oyo State',
                'Delta State', 'Kaduna State', 'Ogun State', 'Edo State', 'Plateau State',
                'Anambra State', 'Imo State', 'Enugu State', 'Cross River', 'Bayelsa State'
              ].map((state, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm">
                  <MapPinIcon className="w-6 h-6 mx-auto mb-2 opacity-60" />
                  <div className="font-medium text-sm">{state}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Don't see your location? We're continuously expanding our reach across Nigeria. 
                Contact us to discuss your project regardless of location.
              </p>
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Discuss Your Location
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - Nigerian Focus */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full"></div>
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Build Your <span className="text-secondary">Dream</span>?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100">
                Join hundreds of satisfied Nigerian clients who have trusted us with their construction dreams. 
                From concept to completion, we're here to make your vision a reality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <PhoneIcon className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-medium">24/7 Support</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <BanknotesIcon className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-medium">Flexible Payments</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <StarIcon className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-medium">Quality Guaranteed</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="btn-secondary text-lg px-10 py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Get Free Consultation
                  <ArrowRightIcon className="w-6 h-6 ml-3 inline" />
                </Link>
                <Link href="/projects" className="btn-outline text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  View Success Stories
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-gray-200 text-sm">
                  🇳🇬 Proudly Nigerian • CAC Registered • Fully Insured • 15+ Years Experience
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