'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
    ArrowRightIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, isVisible }
}

const pillars = [
    {
        number: '01',
        title: 'Empathy-Driven Design',
        description: 'We start by understanding your vision — what you hope to create, feel, and achieve. Before we draw a single line, we listen. Before we pour a single foundation, we understand. Design begins with empathy.',
        accentColor: 'text-rose-500',
        borderColor: 'border-l-rose-500'
    },
    {
        number: '02',
        title: 'Uncompromising Safety',
        description: 'Safety is non-negotiable. Every project, every site, every day. We protect our workers, clients, and communities through rigorous safety protocols, regular training, and a culture where safety is everyone\'s responsibility.',
        accentColor: 'text-blue-500',
        borderColor: 'border-l-blue-500'
    },
    {
        number: '03',
        title: 'Community Impact',
        description: 'Every structure we build contributes to Nigeria\'s growth. We prioritize local employment, skills development, and sustainable construction practices because we believe in building more than buildings — we build futures.',
        accentColor: 'text-emerald-500',
        borderColor: 'border-l-emerald-500'
    },
    {
        number: '04',
        title: 'Innovation & Adaptation',
        description: 'We embrace modern construction technology while adapting to Nigeria\'s unique climate, regulations, and cultural needs. The best solutions come from combining global standards with local wisdom.',
        accentColor: 'text-amber-500',
        borderColor: 'border-l-amber-500'
    },
    {
        number: '05',
        title: 'Transparency & Integrity',
        description: 'We communicate openly with our clients at every stage. No hidden costs, no surprise timelines. What we promise, we deliver. Our reputation is built on trust, and we guard it fiercely.',
        accentColor: 'text-purple-500',
        borderColor: 'border-l-purple-500'
    },
    {
        number: '06',
        title: 'Excellence in Execution',
        description: 'Good enough is never enough. We pursue excellence in every detail — from the precision of our formwork to the finish of our interiors. Quality is not an afterthought; it is the standard.',
        accentColor: 'text-sky-500',
        borderColor: 'border-l-sky-500'
    }
]

const beliefs = [
    'We believe design should begin with empathy.',
    'We believe every project should leave a community better than we found it.',
    'We believe safety is a right, not a privilege.',
    'We believe in doing things right, not just doing things fast.',
    'We believe Nigerian craftsmanship can rival the world\'s best.',
    'We believe our people are our greatest asset.'
]

export default function PhilosophyPage() {
    const [heroLoaded, setHeroLoaded] = useState(false)
    const beliefReveal = useScrollReveal(0.2)
    const pillarReveal = useScrollReveal(0.05)
    const founderReveal = useScrollReveal(0.2)
    const ctaReveal = useScrollReveal(0.2)

    useEffect(() => {
        setHeroLoaded(true)
    }, [])

    return (
        <>
            <Navbar />
            <main className="bg-white overflow-hidden">

                {/* ====== HERO SECTION ====== */}
                <section className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/portfolio/page11_img1.jpg"
                            alt="Philosophy Hero"
                            className="w-full h-full object-cover animate-slow-zoom"
                        />
                        <div className="absolute inset-0 bg-primary/75"></div>
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>

                    {/* Floating shapes */}
                    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                        <div className="absolute top-[20%] left-[8%] w-16 h-16 border-2 border-white/10 rounded-lg animate-float-slow"></div>
                        <div className="absolute top-[30%] right-[12%] w-12 h-12 border-2 border-white/10 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-[25%] left-[15%] w-8 h-8 bg-white/5 rounded-md animate-float-slow rotate-45" style={{ animationDelay: '4s' }}></div>
                    </div>

                    <div className={`relative z-10 container-custom text-center text-white px-4 transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight uppercase transition-all duration-1000 delay-200 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            Our <span className="text-secondary">Philosophy</span>
                        </h1>
                        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/80 leading-relaxed transition-all duration-1000 delay-400 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            The principles and beliefs that guide everything we build
                        </p>
                        <div className={`mt-8 flex items-center justify-center gap-3 transition-all duration-1000 delay-600 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className="w-8 h-[1px] bg-white/40"></span>
                            <span className="text-white/50 text-sm tracking-widest uppercase">Since 1998</span>
                            <span className="w-8 h-[1px] bg-white/40"></span>
                        </div>
                    </div>
                </section>

                {/* ====== OPENING STATEMENT ====== */}
                <section className="py-12 sm:py-16 md:py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-16 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                                We Think Differently
                            </h2>
                            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                                <p>
                                    We start by understanding your vision — what you hope to create, feel, and achieve.
                                </p>
                                <p>
                                    We believe design should begin with empathy.
                                </p>
                                <p className="text-gray-900 font-medium">
                                    We aim to see what you see and feel what you feel, before we shape anything.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== WHAT WE BELIEVE ====== */}
                <section ref={beliefReveal.ref} className="py-12 sm:py-16 md:py-28 bg-white">
                    <div className="container-custom">
                        <div className={`text-center mb-16 transition-all duration-700 ${beliefReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <span className="text-secondary font-bold text-sm uppercase tracking-widest">Our Beliefs</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3">What We Stand For</h2>
                            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {beliefs.map((belief, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${beliefReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: beliefReveal.isVisible ? `${index * 100}ms` : '0ms' }}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{belief}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ====== OUR PILLARS ====== */}
                <section ref={pillarReveal.ref} className="py-12 sm:py-16 md:py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className={`text-center mb-16 transition-all duration-700 ${pillarReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <span className="text-secondary font-bold text-sm uppercase tracking-widest">Our Pillars</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3">The Foundation of How We Work</h2>
                            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {pillars.map((pillar, index) => (
                                <div
                                    key={pillar.title}
                                    className={`group bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100 border-l-4 ${pillar.borderColor} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${pillarReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                                    style={{ transitionDelay: pillarReveal.isVisible ? `${index * 120}ms` : '0ms' }}
                                >
                                    {/* Number */}
                                    <span className={`text-4xl sm:text-5xl font-black ${pillar.accentColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none leading-none`}>{pillar.number}</span>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3 sm:mt-4 mb-2 sm:mb-3">{pillar.title}</h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ====== VISION & MISSION ====== */}
                <section className="py-12 sm:py-16 md:py-28 bg-white">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
                            {/* Mission */}
                            <div className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                <div className="relative z-10">
                                    <span className="text-6xl font-black text-white/10 leading-none select-none">M</span>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">Our Mission</h3>
                                    <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                                        To be Nigeria&apos;s premier construction partner, delivering superior building solutions that exceed expectations while contributing to national development, job creation, and community growth through quality craftsmanship and innovative engineering.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                <div className="relative z-10">
                                    <span className="text-6xl font-black text-white/10 leading-none select-none">V</span>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">Our Vision</h3>
                                    <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
                                        To transform Nigeria&apos;s skylines and communities by becoming the most trusted construction company, known for excellence, integrity, and our commitment to building a stronger, more prosperous nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== FOUNDER QUOTE ====== */}
                <section ref={founderReveal.ref} className="py-12 sm:py-16 md:py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${founderReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {/* Large quote mark */}
                            <div className="text-6xl sm:text-7xl md:text-9xl text-primary/15 font-serif leading-none mb-2 sm:mb-4 select-none">&ldquo;</div>

                            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-800 font-light leading-relaxed mb-6 sm:mb-10 -mt-6 sm:-mt-10">
                                Our goal is not merely to construct buildings, but to create spaces where life thrives, businesses grow, and communities prosper.
                            </blockquote>

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                                    <img
                                        src="/portfolio/page5_img1.jpg"
                                        alt="Founder"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">Gbolahan Alimi</p>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Founder & CEO, OCTAD Engineering</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== CTA ====== */}
                <section ref={ctaReveal.ref} className="py-12 sm:py-16 md:py-20 overflow-hidden">
                    <div className="container-custom">
                        <div className={`bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden transition-all duration-700 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
                            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                            <div className="relative z-10">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Build With Purpose?</h2>
                                <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-10">
                                    Experience the OCTAD difference. Let us bring our philosophy of empathy, excellence, and integrity to your next project.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-primary px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:scale-105 transform"
                                    >
                                        Start a Conversation
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="/projects"
                                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent border-2 border-white text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-white hover:text-primary transition-all duration-300"
                                    >
                                        View Our Work
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}
