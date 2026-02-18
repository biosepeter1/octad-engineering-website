'use client'

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function ContactInfoSection() {
    return (
        <section id="contact" className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Address */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                            Visit Us
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            10 Alade Street, Alapere-Ketu<br />
                            Lagos, Nigeria
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                            Call Us
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            07012629438<br />
                            07062404255
                        </p>
                    </div>

                    {/* Email */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                            Email Us
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            octadengineering@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
