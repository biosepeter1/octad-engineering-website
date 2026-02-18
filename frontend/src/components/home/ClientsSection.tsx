'use client'

import AnimatedCounter from '@/components/AnimatedCounter'

export default function ClientsSection() {
    const clients = ['Laider Pharmaceutical', 'Project Christine Benin', 'Twinning Ovaltin', 'Inbreetic Technologies', 'Vita Construction', 'OCTAD Engineering']

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Trusted by <span className="text-primary">Industry Leaders</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        We&apos;re proud to work with some of the most respected names in construction,
                        real estate, and development.
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative overflow-hidden bg-gray-50 rounded-xl sm:rounded-2xl py-8 sm:py-12">
                    <div className="flex space-x-8 sm:space-x-12 lg:space-x-16 animate-marquee">
                        {/* Client Logos Row 1 */}
                        <div className="flex items-center justify-center min-w-max space-x-8 sm:space-x-12 lg:space-x-16">
                            {clients.map((name) => (
                                <div key={name} className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-24 h-12 sm:w-28 sm:h-14 lg:w-32 lg:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-600 font-bold text-sm sm:text-base lg:text-lg">{name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Duplicate for seamless loop */}
                        <div className="flex items-center justify-center min-w-max space-x-8 sm:space-x-12 lg:space-x-16">
                            {clients.map((name) => (
                                <div key={`dup-${name}`} className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-24 h-12 sm:w-28 sm:h-14 lg:w-32 lg:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-600 font-bold text-sm sm:text-base lg:text-lg">{name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <div className="text-center">
                        <AnimatedCounter
                            end={200}
                            suffix="+"
                            duration={2500}
                            className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2"
                        />
                        <div className="text-sm sm:text-base text-gray-600 font-medium">Projects Completed</div>
                    </div>
                    <div className="text-center">
                        <AnimatedCounter
                            end={15}
                            suffix="+"
                            duration={2000}
                            className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-1 sm:mb-2"
                        />
                        <div className="text-sm sm:text-base text-gray-600 font-medium">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <AnimatedCounter
                            end={98}
                            suffix="%"
                            duration={2200}
                            className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-accent mb-1 sm:mb-2"
                        />
                        <div className="text-sm sm:text-base text-gray-600 font-medium">Client Satisfaction</div>
                    </div>
                    <div className="text-center">
                        <AnimatedCounter
                            end={50}
                            suffix="+"
                            duration={1800}
                            className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-bold text-green-500 mb-1 sm:mb-2"
                        />
                        <div className="text-sm sm:text-base text-gray-600 font-medium">Expert Team Members</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
