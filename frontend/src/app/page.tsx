'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'

// Lazy-load below-the-fold sections for faster initial page load
const AboutSection = dynamic(() => import('@/components/home/AboutSection'))
const ServicesSection = dynamic(() => import('@/components/home/WhatWeDo'))
const PhilosophySection = dynamic(() => import('@/components/home/PhilosophySection'))
const ProjectsSection = dynamic(() => import('@/components/home/ProjectsSection'))
const FounderSection = dynamic(() => import('@/components/home/FounderSection'))
const FeedbackSection = dynamic(() => import('@/components/home/FeedbackSection'))
const ContactInfoSection = dynamic(() => import('@/components/home/ContactInfoSection'))
const ClientsSection = dynamic(() => import('@/components/home/ClientsSection'))
const BentoGallerySection = dynamic(() => import('@/components/home/BentoGallerySection'))

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Carousel */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Clients/Partners Section */}
      <ClientsSection />

      {/* 4. Featured Projects Bento Gallery */}
      <BentoGallerySection />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Philosophy Section */}
      <PhilosophySection />

      {/* 7. Projects Section */}
      <ProjectsSection />

      {/* 8. Founder Section */}
      <FounderSection />

      {/* 9. Client Feedback Section */}
      <FeedbackSection />

      {/* 10. Contact Info Section */}
      <ContactInfoSection />

      <Footer />
    </main>
  )
}