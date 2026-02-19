'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/WhatWeDo'
import PhilosophySection from '@/components/home/PhilosophySection'
import ProjectsSection from '@/components/home/ProjectsSection'
import FounderSection from '@/components/home/FounderSection'
import FeedbackSection from '@/components/home/FeedbackSection'
import ContactInfoSection from '@/components/home/ContactInfoSection'

import ClientsSection from '@/components/home/ClientsSection'
import BentoGallerySection from '@/components/home/BentoGallerySection'

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