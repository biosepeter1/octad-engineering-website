'use client'

import AnimatedCounter from '@/components/AnimatedCounter'

export default function ClientsSection() {
    const clientLogos = [
        { name: 'Inbreetic Technologies', logo: '/partners/inbreetic-technologies.jpg' },
        { name: 'Tinc IT Solutions', logo: '/partners/tinc-it-solutions.png' },
        { name: '143 Fitness', logo: '/partners/143-fitness.jpg' },
        { name: 'Bamboo', logo: '/partners/bamboo.jpg' },
        { name: 'Chrysalis', logo: '/partners/chrysalis.jpg' },
        { name: 'Civic Centre', logo: '/partners/civic-centre.jpg' },
        { name: 'Sunbeth Energies', logo: '/partners/sunbeth-energies.jpg' },
        { name: 'Punter Class', logo: '' }, // No logo yet
        { name: 'Faaji Production', logo: '/partners/faaji-production.jpg' },
        { name: 'Vita Construction', logo: '/partners/vita-construction.jpg' }
    ]

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
            </div>

            {/* Marquee Container - Full Width */}
            <div className="w-full relative overflow-hidden bg-gray-50 py-8 sm:py-12 mb-12 sm:mb-16">
                <div className="flex space-x-4 sm:space-x-8 lg:space-x-16 animate-marquee">
                    {/* Client Logos Row 1 */}
                    <div className="flex items-center justify-center min-w-max space-x-4 sm:space-x-8 lg:space-x-16">
                        {clientLogos.map((client) => (
                            <div key={client.name} className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl h-full flex items-center">
                                <div className="w-32 sm:w-36 lg:w-44 h-auto min-h-[6rem] sm:min-h-[6rem] bg-white rounded-lg flex flex-col items-center justify-center p-2 gap-1.5">
                                    {client.logo && (
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-9 sm:h-10 w-auto object-contain transition-all duration-300"
                                        />
                                    )}
                                    <span className="text-gray-600 font-medium text-xs text-center leading-tight line-clamp-2">
                                        {client.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center justify-center min-w-max space-x-4 sm:space-x-8 lg:space-x-16">
                        {clientLogos.map((client) => (
                            <div key={`dup-${client.name}`} className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl h-full flex items-center">
                                <div className="w-32 sm:w-36 lg:w-44 h-auto min-h-[6rem] sm:min-h-[6rem] bg-white rounded-lg flex flex-col items-center justify-center p-2 gap-1.5">
                                    {client.logo && (
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-9 sm:h-10 w-auto object-contain transition-all duration-300"
                                        />
                                    )}
                                    <span className="text-gray-600 font-medium text-xs text-center leading-tight line-clamp-2">
                                        {client.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-custom">
                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
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
