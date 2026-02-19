import Image from 'next/image'

const services = [
    {
        title: 'Building Design',
        description:
            'Expert structural design services that bring your architectural vision to life. Detailed blueprints and plans ensuring safety and functionality.',
        image: '/portfolio/page14_img3.jpg',
    },
    {
        title: 'General Contracting',
        description:
            'Comprehensive project management and construction services from foundation to finish. Quality craftsmanship and timely delivery.',
        image: '/portfolio/page16_img1.jpg',
    },
    {
        title: 'Renovation & Refurbishment',
        description:
            'Transform existing buildings and factories with our expert renovation services. Modernizing spaces and restoring structures.',
        image: '/portfolio/page16_img3.jpg',
    },
    {
        title: 'Project Management',
        description:
            'End-to-end oversight of construction projects. coordinating timelines, budgets, resources, and quality.',
        image: '/portfolio/page14_img1.jpg',
    },
    {
        title: 'Interior Design',
        description:
            'Creating functional and inspiring interior spaces for offices, homes, and commercial properties.',
        image: '/portfolio/page20_img1.jpg',
    },
]

export default function WhatWeDo() {
    return (
        <section id="services" className="py-16 sm:py-24 bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
                        Our Services
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="bg-white group hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]">
                            <div className="h-64 overflow-hidden relative">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500"></div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light mb-6">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
