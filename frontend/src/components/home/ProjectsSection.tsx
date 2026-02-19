'use client'

import Link from 'next/link'

const projects = [
    { id: 1, image: '/portfolio/page16_img1.jpg', title: 'Commercial Complex' },
    { id: 2, image: '/portfolio/page14_img2.jpg', title: 'Residential Development' },
    { id: 3, image: '/portfolio/page18_img1.jpg', title: 'Factory Renovation' },
    { id: 4, image: '/portfolio/page10_img3.jpg', title: 'Interior Fit-out' },
    { id: 5, image: '/portfolio/page12_img2.jpg', title: 'Modern Office' },
    { id: 6, image: '/portfolio/page19_img1.jpg', title: 'Infrastructure' },
]

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-12 sm:py-20 bg-white">
            <div className="container-custom">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
                        Our Projects
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="relative h-64 sm:h-80 group overflow-hidden bg-gray-200">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 backdrop-blur-[1px] group-hover:backdrop-blur-sm transition-all duration-500 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold uppercase tracking-wider translate-y-4 group-hover:translate-y-0 opacity-70 group-hover:opacity-100 transition-all duration-500 shadow-sm">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-3 font-medium transition-all duration-300 uppercase tracking-wider"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    )
}
