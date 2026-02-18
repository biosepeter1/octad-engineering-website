'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CTASection() {
    return (
        <section className="section-padding bg-primary text-white">
            <div className="container-custom text-center">
                <h2 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    Ready to Start Your Project?
                </h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                    Contact us today for a free consultation and quote. Let&apos;s bring your vision to life!
                </p>
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
                    <Link href="/contact" className="btn-secondary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                        Get Free Quote
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline" />
                    </Link>
                    <Link href="tel:+2348031234567" className="btn-outline border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                        <span className="hidden xs:inline">Call Now: </span>07012629438
                    </Link>
                </div>
            </div>
        </section>
    )
}
