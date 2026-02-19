'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Image from 'next/image'

const slides = [
    {
        id: 1,
        image: '/portfolio/page9_img1.jpg',
        title: 'OCTAD ENGINEERING LIMITED',
        subtitle: 'Building the Future, One Blueprint at a Time',
        cta: 'Our Projects',
        link: '/projects'
    },
    {
        id: 2,
        image: '/portfolio/page12_img1.jpg',
        title: 'Who Is OCTAD?',
        subtitle: 'A Nigeria Incorporated company dedicated to engineering construction excellence.',
        cta: 'Learn More',
        link: '/about'
    },
    {
        id: 3,
        image: '/portfolio/page11_img1.jpg',
        title: 'Our Services',
        subtitle: 'Building Design, General Contracting, Renovation, Project Management, Interior Design.',
        cta: 'Explore Services',
        link: '/services'
    },
    {
        id: 4,
        image: '/portfolio/page5_img1.jpg',
        title: 'We Think Differently',
        subtitle: 'Design begins with empathy. We aim to see what you see and feel what you feel.',
        cta: 'Our Philosophy',
        link: '/philosophy'
    }
]

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-advance every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section className="relative h-[60vh] sm:h-[85vh] md:h-screen min-h-[400px] sm:min-h-[600px] overflow-hidden bg-gray-900">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                >
                    {/* Image & Solid Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className="w-full h-full object-cover object-center animate-slow-zoom"
                        />
                        {/* Solid dark overlay for legibility, no gradients */}
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Content Centered */}
                    <div className="relative z-20 h-full container-custom flex items-center justify-center text-center">
                        <div className={`max-w-4xl text-white px-4 transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100 animate-slide-up' : 'translate-y-10 opacity-0'
                            }`}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight uppercase">
                                {slide.title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-10 text-gray-100 font-light max-w-2xl mx-auto">
                                {slide.subtitle}
                            </p>
                            {/* Minimalist Button */}
                            <Link
                                href={slide.link}
                                className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 uppercase tracking-wider"
                            >
                                {slide.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}



            {/* Indicators (Lines) */}
            <div className="absolute z-30 bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1 transition-all duration-500 ${index === currentSlide ? 'bg-white w-16' : 'bg-white/30 w-8 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
