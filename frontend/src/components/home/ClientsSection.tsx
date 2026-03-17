import Image from 'next/image'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function ClientsSection() {
    const clientLogos = [
        { name: 'Laider Pharmaceutical', logo: '/partners/laider-pharmaceutical.webp' },
        { name: 'Inbreetic Technologies', logo: '/partners/inbreetic-technologies.jpg' },
        { name: 'Tinc IT Solutions', logo: '/partners/tinc-it-solutions.png' },
        { name: 'Mysranne Design Studio', logo: '/partners/mysranne-design-studio.jpg' },
        { name: '143 Fitness', logo: '/partners/143-fitness.jpg' },
        { name: 'Civic Centre', logo: '/partners/civic-centre.jpg' },
        { name: 'Sunbeth Energies', logo: '/partners/sunbeth-energies.jpg' },
        { name: 'Punter Clash', logo: '/partners/punter-clash.jpg' },
        { name: 'Faaji Production', logo: '/partners/faaji-production.jpg' },
        { name: 'Vita Construction', logo: '/partners/vita-construction.jpg' },
        { name: 'Studio Emodi', logo: '/partners/studio-emodi.png' },
        { name: 'Bamboo', logo: '/partners/bamboo.jpg' },
        { name: 'Chrysalis', logo: '/partners/chrysalis.jpg' },
        { name: 'Verge Konstruktiv Bau', logo: '/partners/Verge konstrutiv bau.png' }
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
                            <div key={client.name} className="group p-2 sm:p-3 lg:p-4 h-full flex flex-col items-center justify-center will-change-transform cursor-pointer">
                                {client.logo && (
                                    <div className="relative h-12 sm:h-14 lg:h-16 w-32 sm:w-36 lg:w-40 mb-3 transition-transform duration-500 group-hover:scale-105">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            sizes="160px"
                                            className="object-contain mix-blend-multiply"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <span className="text-gray-400 font-medium text-xs sm:text-sm text-center tracking-wide group-hover:text-primary transition-colors duration-300">
                                    {client.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center justify-center min-w-max space-x-4 sm:space-x-8 lg:space-x-16">
                        {clientLogos.map((client) => (
                            <div key={`dup-${client.name}`} className="group p-2 sm:p-3 lg:p-4 h-full flex flex-col items-center justify-center will-change-transform cursor-pointer">
                                {client.logo && (
                                    <div className="relative h-12 sm:h-14 lg:h-16 w-32 sm:w-36 lg:w-40 mb-3 transition-transform duration-500 group-hover:scale-105">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            sizes="160px"
                                            className="object-contain mix-blend-multiply"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <span className="text-gray-400 font-medium text-xs sm:text-sm text-center tracking-wide group-hover:text-primary transition-colors duration-300">
                                    {client.name}
                                </span>
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
