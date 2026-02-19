'use client'

import { motion } from 'framer-motion'


const projects = [
    {
        id: 1,
        title: 'Moyosoreanne Design Studio - Sunbeth Energies',
        category: 'Commercial',
        image: '/portfolio/sunbeth_5.jpg', // Using sunbeth_5 as it looked large/good size in file list
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        id: 2,
        title: 'Studio Emodi - Ballavista',
        category: 'Residential',
        image: '/portfolio/ballavista_1.jpg',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 3,
        title: 'Punter Class & Faaji Production',
        category: 'Commercial',
        image: '/portfolio/punter_3.jpg',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 4,
        title: 'Moyosoreanne Design Studio - Sunbeth Energies',
        category: 'Commercial',
        image: '/portfolio/sunbeth_2.jpg',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 5,
        title: 'Punter Class & Faaji Production',
        category: 'Commercial',
        image: '/portfolio/punter_1.jpg',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        id: 6,
        title: 'Studio Emodi - Ballavista',
        category: 'Residential',
        image: '/portfolio/ballavista_6.jpg',
        className: 'md:col-span-1 md:row-span-1'
    }
]

export default function BentoGallerySection() {
    return (
        <section className="py-10 md:py-20 bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                        Featured <span className="text-primary">Masterpieces</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        A curated selection of our finest work, delivering excellence in every detail.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 ${project.className}`}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-accent text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.category}
                                </span>
                                <h3 className="text-white text-xl font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
