'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GalleryLightbox from './GalleryLightbox'

// Helper to generate image paths for a project folder
function generateImages(folder: string, count: number, ext: string = 'jpeg'): string[] {
    return Array.from({ length: count }, (_, i) => `/portfolio/projects/${folder}/${i + 1}.${ext}`)
}

// Special handling for Sunbeth which has mixed extensions
function sunbethImages(): string[] {
    // Current files: 1.jpeg, 2.jpg, 3.jpg, 4.jpg, 5.jpg
    const jpegIndices = [1]
    const jpgIndices = [2, 3, 4, 5]
    return [
        ...jpegIndices.map(i => `/portfolio/projects/Sunbeth-Energies---Mysranne-Design-Studio/${i}.jpeg`),
        ...jpgIndices.map(i => `/portfolio/projects/Sunbeth-Energies---Mysranne-Design-Studio/${i}.jpg`),
    ].sort((a, b) => {
        const numA = parseInt(a.split('/').pop() || '0')
        const numB = parseInt(b.split('/').pop() || '0')
        return numA - numB
    })
}

/*
  Desktop 3-column bento layout (each row = 300px):
  ┌────────────────────┬───────────┐
  │ Inbritic (2×2)     │ Tinc (1×1)│
  │   BIG HERO         ├───────────┤
  │                    │Laider(1×1)│
  ├──────────┬─────────┴───────────┤
  │Sunbeth   │ Ballavista (2×1)    │
  │ (1×1)    │       WIDE          │
  ├──────────┼───────────┬─────────┤
  │Punter    │Christine  │143 Fit  │
  │ (1×1)    │ (1×2) BIG │ (1×1)   │
  ├──────────┤           ├─────────┤
  │Agbara    │           │ Akure   │
  │ (1×1)    │           │ (1×1)   │
  └──────────┴───────────┴─────────┘
*/

const projects = [
    {
        id: 1,
        title: 'Inbreetic Technologies',
        category: 'Commercial',
        images: generateImages('Inbritic-Technology', 11),
        coverIndex: 0,
        gridClass: 'md:col-span-2 md:row-span-2',
    },
    {
        id: 2,
        title: 'Tinc IT Solutions',
        category: 'Commercial',
        images: generateImages('Tinc-IT-Solutions', 14),
        coverIndex: 0,
        gridClass: '',
    },
    {
        id: 3,
        title: 'Laider Pharmaceutical',
        category: 'Commercial',
        images: generateImages('Laider-Pharmaceutical', 15),
        coverIndex: 1,
        gridClass: '',
    },
    {
        id: 4,
        title: 'Sunbeth Energies — Mysranne Design Studio',
        category: 'Commercial',
        images: sunbethImages(),
        coverIndex: 3,
        gridClass: '',
    },
    {
        id: 5,
        title: 'Punter Clash & Faaji Production',
        category: 'Commercial',
        images: generateImages('Punter-Clash-and-Faaji-Production--Mysranne-Studio', 22),
        coverIndex: 0,
        gridClass: 'md:col-span-2',
    },
    {
        id: 6,
        title: 'Ballavista — Studio Emodi',
        category: 'Residential',
        images: generateImages('Ballavista---Studio-Emodi', 9),
        coverIndex: 2,
        gridClass: '',
    },
    {
        id: 7,
        title: 'Project Christine Benin',
        category: 'Residential',
        images: generateImages('Project-Christine-Benin', 21).reverse(),
        coverIndex: 16,
        gridClass: 'md:row-span-2',
    },
    {
        id: 8,
        title: '143 Fitness',
        category: 'Commercial',
        images: generateImages('143-Fitness', 22),
        coverIndex: 2,
        gridClass: '',
    },
    {
        id: 9,
        title: 'Project Verge Agbara',
        category: 'Residential',
        images: generateImages('Project-Agbara', 16),
        coverIndex: 0,
        gridClass: '',
    },
    {
        id: 10,
        title: 'Project Kanmi Akure',
        category: 'Residential',
        images: generateImages('project-akure', 26, 'jpg'),
        coverIndex: 0,
        gridClass: '',
    },
]

export default function BentoGallerySection() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    return (
        <>
            <section className="py-10 md:py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container-custom">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
                            Featured <span className="text-primary">Masterpieces</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            A curated selection of our finest work, delivering excellence in every detail.
                            Click any project to explore the full gallery.
                        </p>
                    </div>

                    {/* Bento Grid: 1 col mobile, 3 col desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[250px] md:auto-rows-[280px]">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                onClick={() => setSelectedProject(project)}
                                className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${project.gridClass}`}
                            >
                                <Image
                                    src={project.images[project.coverIndex]}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    quality={75}
                                />

                                {/* Title — always visible at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-5">
                                    <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold leading-tight">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Hover overlay — View Gallery */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="bg-white/90 dark:bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                        View Gallery
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <GalleryLightbox
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                images={selectedProject?.images || []}
                title={selectedProject?.title || ''}
            />
        </>
    )
}
