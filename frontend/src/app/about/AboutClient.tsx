'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    TrophyIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCounter from '@/components/AnimatedCounter'
import { aboutAPI } from '@/lib/api'

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
    }
}

const defaultAbout: About = {
    _id: 'default',
    companyInfo: 'OCTAD is a construction company that specializes in engineering construction and project management.',
    mission: 'To be Nigeria\'s premier construction partner...',
    vision: 'To transform Nigeria\'s skylines...',
    values: [
        { title: 'Empathy-Driven Design', description: '...' },
        { title: 'Uncompromising Safety', description: '...' },
        { title: 'Community Impact', description: '...' },
        { title: 'Innovation & Adaptation', description: '...' }
    ],
    foundedYear: 2016,
    employeeCount: 45,
    contactInfo: {
        phone: '07012629438',
        email: 'octadengineering@gmail.com',
        address: { city: 'Lagos', state: 'Lagos State', country: 'Nigeria' }
    }
}

export default function AboutClient() {
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
            } finally {
                setLoading(false)
            }
        }
        fetchAbout()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <>
            <Navbar />
            <main>
                {/* About content here... */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <h1 className="text-4xl font-bold">About Octad</h1>
                        <p>{about.companyInfo}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
