'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/WhatWeDo' // Using the file we refactored
import PhilosophySection from '@/components/home/PhilosophySection'
import ProjectsSection from '@/components/home/ProjectsSection'
import FounderSection from '@/components/home/FounderSection'
import FeedbackSection from '@/components/home/FeedbackSection'
import ContactInfoSection from '@/components/home/ContactInfoSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Carousel */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Philosophy Section */}
      <PhilosophySection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. Founder Section */}
      <FounderSection />

      {/* 7. Client Feedback Section */}
      <FeedbackSection />

      {/* 8. Contact Info Section */}
      <ContactInfoSection />

      <Footer />
    </main>
  )
}