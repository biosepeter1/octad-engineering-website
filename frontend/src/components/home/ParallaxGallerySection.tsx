'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'

const projects = [
    {
        id: 1,
        title: 'Moyosoreanne Design Studio - Sunbeth Energies',
        category: 'Commercial',
        image: '/portfolio/sunbeth_5.jpg',
        color: '#1a1a1a',
        subtitle: 'Innovative energy solutions through modern commercial design.'
    },
    {
        id: 2,
        title: 'Studio Emodi - Ballavista',
        category: 'Residential',
        image: '/portfolio/ballavista_1.jpg',
        color: '#2d2d2d',
        subtitle: 'Luxury residential living redefined with elegant architecture.'
    },
    {
        id: 3,
        title: 'Punter Class & Faaji Production',
        category: 'Commercial',
        image: '/portfolio/punter_3.jpg',
        color: '#1a1a1a',
        subtitle: 'A dynamic production space built for creativity and performance.',
        imgPosition: 'top'
    },
    {
        id: 4,
        title: 'Sunbeth Energies - Interior',
        category: 'Interior',
        image: '/portfolio/sunbeth_2.jpg',
        color: '#2d2d2d',
        subtitle: 'Interior spaces that blend functionality with aesthetic warmth.'
    },
    {
        id: 5,
        title: 'Punter Class - Studio',
        category: 'Commercial',
        image: '/portfolio/punter_1.jpg',
        color: '#1a1a1a',
        subtitle: 'High-end studio facilities for professional content creation.',
        imgPosition: 'top'
    },
    {
        id: 6,
        title: 'Ballavista - Exterior',
        category: 'Residential',
        image: '/portfolio/ballavista_6.jpg',
        color: '#2d2d2d',
        subtitle: 'Striking exterior facades that make a bold statement.'
    }
]

function Card({
    i,
    project,
    progress,
    range,
    targetScale
}: {
    i: number
    project: (typeof projects)[0]
    progress: MotionValue<number>
    range: [number, number]
    targetScale: number
}) {
    const container = useRef(null)

    // Use global progress for stacking, but local scroll for image parallax
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    })

    // Scale down older cards as scroll progresses
    const scale = useTransform(progress, range, [1, targetScale])

    // Parallax the image slightly as it enters/exits
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1])

    return (
        <div
            ref={container}
            className="h-[100vh] flex items-center justify-center sticky top-0"
        >
            <motion.div
                style={{
                    scale,
                    backgroundColor: project.color,
                    top: `calc(-5vh + ${i * 35}px)`,
                    zIndex: i, // Ensure new cards stack ON TOP of older ones
                }}
                className="relative flex flex-col md:flex-row h-[70vh] md:h-[80vh] w-[95%] md:w-[75vw] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 origin-top"
            >
                {/* Text side */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center h-full relative z-10">
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-white/80 uppercase bg-white/10 w-fit rounded-full backdrop-blur-sm">
                        {project.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-sm">
                        {project.subtitle}
                    </p>
                    <button className="px-8 py-4 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors w-fit">
                        View Case Study
                    </button>

                    <div className="absolute bottom-8 right-8 text-[12rem] font-bold text-white/5 leading-none pointer-events-none select-none">
                        0{project.id}
                    </div>
                </div>

                {/* Image side */}
                <div className="w-full md:w-3/5 h-full relative overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full">
                        <Image
                            fill
                            src={project.image}
                            alt={project.title}
                            className="object-cover"
                            style={{ objectPosition: project.imgPosition || 'center' }}
                            // Priority for first image only
                            priority={i === 0}
                        />
                    </motion.div>
                    {/* Inner Shadow for blend */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/50 to-transparent md:via-transparent" />
                </div>
            </motion.div>
        </div>
    )
}

export default function ParallaxGallerySection() {
    const container = useRef(null)
    // Track scroll progress of the entire section
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    })

    return (
        <section ref={container} className="relative mt-[10vh] mb-[20vh]">
            {/* Header Spacer */}
            <div className="h-[15vh] flex flex-col items-center justify-center mb-10 px-4 text-center">
                <h2 className="text-4xl md:text-7xl font-bold text-gray-900 tracking-tight">
                    Signature <span className="text-gray-400">Projects</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-500 mt-4 max-w-lg mx-auto font-light">
                    Where engineering precision meets architectural excellence.
                </p>
            </div>

            {projects.map((project, i) => {
                // Calculate dynamic scale target: each subsequent card scales down the previous ones
                const targetScale = 1 - ((projects.length - i) * 0.05)
                return (
                    <Card
                        key={project.id}
                        i={i}
                        project={project}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                )
            })}
        </section>
    )
}
