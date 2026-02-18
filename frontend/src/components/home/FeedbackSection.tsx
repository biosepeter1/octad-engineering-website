'use client'

import Link from 'next/link'

export default function FeedbackSection() {
    return (
        <section className="py-20 bg-primary text-white text-center">
            <div className="container-custom">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 uppercase tracking-wide">
                    Client Feedback
                </h2>
                <p className="text-xl sm:text-2xl font-light max-w-3xl mx-auto mb-12 leading-relaxed opacity-90">
                    We prioritize quality delivery, clear communication, and timely project execution.
                    Client references and project feedback can be provided on request.
                </p>
                <a
                    href="mailto:octadengineering@gmail.com?subject=Request for References"
                    className="inline-block border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-medium transition-all duration-300 uppercase tracking-wider"
                >
                    Request References
                </a>
            </div>
        </section>
    )
}
