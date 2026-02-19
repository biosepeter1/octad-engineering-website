'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowRightIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'

// Real Project Data from Portfolio
interface Project {
  id: string
  title: string
  category: string
  status: string
  location: string
  description: string
  images: string[]
  isFeature?: boolean
}

const portfolioProjects: Project[] = [
  {
    id: 'office-fitout-egbeda',
    title: 'Corporate Office Interior Fit-Out',
    category: 'Interior Fit-Out',
    status: 'completed',
    location: '133 Akowonjo Rd, Egbeda, Lagos',
    description: 'A premium corporate office interior fit-out delivered by OCTAD Engineering. The project encompassed a complete transformation featuring a modern reception area with branded accent walls and a contemporary ring chandelier, an open-plan workspace with lush greenery dividers, a fully equipped boardroom with ergonomic chairs and linear pendant lighting, and a welcoming lounge area with a vibrant floral wall mural. Every detail, from the wood-grain vinyl flooring to the decorative POP ceiling, reflects OCTAD\'s commitment to quality craftsmanship.',
    images: [
      '/portfolio/page10_img1.jpg', '/portfolio/page10_img2.jpg', '/portfolio/page10_img3.jpg', '/portfolio/page10_img4.jpg',
      '/portfolio/page11_img1.jpg', '/portfolio/page11_img2.jpg', '/portfolio/page11_img3.jpg', '/portfolio/page11_img4.jpg',
      '/portfolio/page12_img1.jpg', '/portfolio/page12_img2.jpg', '/portfolio/page12_img3.jpg', '/portfolio/page12_img4.jpg',
      '/portfolio/page13_img1.jpg', '/portfolio/page13_img2.jpg', '/portfolio/page13_img3.jpg', '/portfolio/page13_img4.jpg'
    ],
    isFeature: true
  },
  {
    id: 'foundation-structural',
    title: 'Residential Foundation & Structural Works',
    category: 'Construction',
    status: 'completed',
    location: 'Lagos',
    description: 'From the ground up — this project showcases OCTAD\'s core structural engineering capabilities. Our team executed precision foundation trenching, reinforcement laying, and concrete formwork for a residential development. The images capture the reality of construction: our engineers supervising concrete mixing operations, overseeing slab decking with timber formwork, and ensuring every column and beam meets exacting standards before the pour.',
    images: ['/portfolio/page14_img1.jpg', '/portfolio/page14_img2.jpg', '/portfolio/page14_img3.jpg', '/portfolio/page14_img4.jpg', '/portfolio/page14_img5.jpg'],
    isFeature: true
  },
  {
    id: 'residential-building',
    title: 'Residential Building Project',
    category: 'Construction',
    status: 'in-progress',
    location: 'Lagos',
    description: 'A residential building project demonstrating OCTAD\'s expertise from block-laying to roofing. Our skilled masons constructed load-bearing walls using quality sandcrete blocks, while our plumbing team installed concealed pipe runs within the walls. The project progressed through to the roofing phase with stone-coated tiles, and interior works including wall tiling and bathroom finishing — all delivered under OCTAD\'s strict quality supervision.',
    images: [
      '/portfolio/page15_img1.jpg', '/portfolio/page15_img2.jpg', '/portfolio/page15_img3.jpg', '/portfolio/page15_img4.jpg',
      '/portfolio/page16_img1.jpg', '/portfolio/page16_img2.jpg', '/portfolio/page16_img3.jpg', '/portfolio/page16_img4.jpg'
    ]
  },
  {
    id: 'finishing-works',
    title: 'Interior Finishing & POP Ceiling Works',
    category: 'Finishing',
    status: 'completed',
    location: 'Lagos',
    description: 'Precision finishing is where a building becomes a space. This project highlights OCTAD\'s expertise in POP (Plaster of Paris) ceiling installation and wall plastering. Our artisans crafted recessed ceiling panels with clean edges and smooth surfaces, while our rendering team applied even coats of cement plaster to achieve perfectly flat walls — the essential foundation for premium paint finishes.',
    images: ['/portfolio/page17_img1.jpg', '/portfolio/page17_img2.jpg', '/portfolio/page17_img3.jpg']
  },
  {
    id: 'industrial-warehouse',
    title: 'Industrial Warehouse Development',
    category: 'Industrial',
    status: 'in-progress',
    location: 'Lagos',
    description: 'A large-scale industrial warehouse project showcasing OCTAD\'s capacity for heavy-duty steel and metal fabrication. Our team executed on-site welding of structural steel components, pipe fitting for industrial HVAC ductwork, and the erection of a wide-span steel portal frame structure. The project involved scaffolding for high-elevation wall finishing within the warehouse\'s massive interior — demonstrating our ability to handle complex industrial builds.',
    images: [
      '/portfolio/page18_img1.jpg', '/portfolio/page18_img2.jpg', '/portfolio/page18_img3.jpg', '/portfolio/page18_img4.jpg',
      '/portfolio/page19_img1.jpg', '/portfolio/page19_img2.jpg', '/portfolio/page19_img3.jpg', '/portfolio/page19_img4.jpg', '/portfolio/page19_img5.jpg'
    ]
  },
  {
    id: 'coworking-fitout',
    title: 'Modern Co-Working Space Fit-Out',
    category: 'Interior Fit-Out',
    status: 'completed',
    location: 'Lagos',
    description: 'A contemporary co-working space designed for creativity and collaboration. OCTAD delivered a turnkey interior fit-out featuring a stylish meeting room with a "Just Greet!" neon sign, warm wood-slat accent walls with integrated LED strip lighting, a conference area with frosted glass partitions, and a lounge zone with decorative shelving and custom bar seating. The design blends functionality with a vibrant, modern aesthetic that inspires productivity.',
    images: [
      '/portfolio/page20_img1.jpg', '/portfolio/page20_img2.jpg', '/portfolio/page20_img3.jpg', '/portfolio/page20_img4.jpg',
      '/portfolio/page21_img1.jpg', '/portfolio/page21_img2.jpg', '/portfolio/page21_img3.jpg'
    ]
  },
  {
    id: 'sunbeth-energies',
    title: 'Moyosoreanne Design Studio - Sunbeth Energies',
    category: 'Interior Fit-Out',
    status: 'completed',
    location: 'Lagos',
    description: 'A sleek corporate office transformation for Sunbeth Energies, delivered by Moyosoreanne Design Studio. The project features a stunning branded reception area with marble-effect wall cladding and warm alcove lighting, a modern executive office with dark wood panelling and pendant lighting, a glass-walled corridor with frosted orange accents, an inspiring workspace with motivational wall signage, and two premium conference rooms — one with orange leather chairs and city views, and another with wood-panel walls and presentation screen. Every space reflects energy, professionalism, and contemporary design.',
    images: [
      '/portfolio/sunbeth_1.jpg', '/portfolio/sunbeth_2.jpg', '/portfolio/sunbeth_3.jpg',
      '/portfolio/sunbeth_4.jpg', '/portfolio/sunbeth_5.jpg'
    ],
    isFeature: true
  },
  {
    id: 'punter-class-faaji',
    title: 'Moyosoreanne Design Studio - Punter Class and Faaji Production',
    category: 'Interior Fit-Out',
    status: 'completed',
    location: 'Lagos',
    description: 'A vibrant and creative office space designed by Moyosoreanne Design Studio for Punter Class and Faaji Production. The fit-out showcases bold design choices including a "Reach Your Potential" motivational wall mural with orange graphic elements, a cosy break room with warm terracotta walls and wood-plank flooring, an elegant reception lobby with a circular mirror feature wall and mustard velvet sofa, a dynamic open-plan workspace with geometric wall art and planter dividers, glass-partitioned HR offices with slatted wood ceiling details, and a sleek kitchenette with louvred cabinetry and integrated seating.',
    images: [
      '/portfolio/punter_1.jpg', '/portfolio/punter_2.jpg', '/portfolio/punter_3.jpg',
      '/portfolio/punter_4.jpg', '/portfolio/punter_5.jpg', '/portfolio/punter_6.jpg'
    ],
    isFeature: true
  },
  {
    id: 'ballavista-luxury-residence',
    title: 'Studio Emodi - Ballavista',
    category: 'Interior Fit-Out',
    status: 'completed',
    location: 'Lagos',
    description: 'An ultra-luxury residential interior delivered by Studio Emodi at the Ballavista residence. This breathtaking project features a dramatic double-height living room with polished Calacatta marble floors, glass balustrade mezzanine, and curated contemporary art throughout. Highlights include an elegant sitting room with a circular recessed ceiling, globe chandelier, and a curved cream sofa paired with a statement green accent chair, a designer art lounge with a unique bolster-cushion daybed and abstract portrait paintings, a refined dining room with modern globe pendant lighting and geometric area rug, and a luxurious master bedroom with cove lighting, built-in wardrobes, and marble flooring. Every finish exudes sophistication and grandeur.',
    images: [
      '/portfolio/ballavista_1.jpg', '/portfolio/ballavista_2.jpg', '/portfolio/ballavista_3.jpg',
      '/portfolio/ballavista_4.jpg', '/portfolio/ballavista_5.jpg', '/portfolio/ballavista_6.jpg'
    ],
    isFeature: true
  }
]

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}


export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(portfolioProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  // Scroll reveal refs
  const gridReveal = useScrollReveal(0.05)

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(portfolioProjects.map(p => p.category)))]

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  useEffect(() => {
    let result = portfolioProjects

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term)
      )
    }

    setFilteredProjects(result)
  }, [searchTerm, selectedCategory])

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 overflow-hidden">

        {/* ====== CINEMATIC HERO SECTION ====== */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/portfolio/page10_img1.jpg"
              alt="Projects Hero"
              className="w-full h-full object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
            <div className="absolute top-[15%] left-[10%] w-20 h-20 border-2 border-white/10 rounded-lg animate-float-slow" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-[25%] right-[15%] w-14 h-14 border-2 border-secondary/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[30%] left-[20%] w-10 h-10 bg-secondary/10 rounded-md animate-float-slow rotate-45" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-[40%] right-[8%] w-6 h-6 bg-white/10 rounded-full animate-float-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-[40%] right-[25%] w-16 h-16 border border-white/5 rounded-xl animate-float-slow rotate-12" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Hero content */}
          <div className={`relative z-10 container-custom text-center text-white px-4 transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight transition-all duration-1000 delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Our <span className="text-secondary">Portfolio</span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/80 leading-relaxed transition-all duration-1000 delay-500 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              A showcase of engineering excellence and construction mastery across Nigeria
            </p>

            <div className={`mt-8 flex items-center justify-center gap-3 transition-all duration-1000 delay-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-8 h-[1px] bg-white/40"></span>
              <span className="text-white/50 text-sm tracking-widest uppercase">Since 1998</span>
              <span className="w-8 h-[1px] bg-white/40"></span>
            </div>
          </div>
        </section>

        {/* ====== FILTER BAR ====== */}
        <section className="sticky top-[70px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/20 py-4">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${selectedCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72 group">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-2 border-transparent rounded-xl focus:ring-0 focus:border-primary/30 focus:bg-white text-sm transition-all duration-300 shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECTS GRID ====== */}
        <section ref={gridReveal.ref} className="py-10 sm:py-16 md:py-24 min-h-screen">
          <div className="container-custom">
            {/* Section header */}
            <div className={`text-center mb-16 transition-all duration-700 ${gridReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-secondary font-bold text-sm uppercase tracking-widest">Our Work</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Featured Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 h-[300px] sm:h-[400px] ${gridReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  style={{
                    transitionDelay: gridReveal.isVisible ? `${index * 150}ms` : '0ms'
                  }}
                  onClick={() => {
                    setSelectedProject(project)
                    setShowDetailsModal(true)
                  }}
                >
                  {/* Animated border on hover */}
                  <div className="absolute -inset-[2px] bg-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>

                  <div className="relative h-full bg-white rounded-2xl overflow-hidden z-10">
                    {/* Image with hover zoom */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-500"></div>

                      {/* Hover color tint */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500"></div>

                      {/* Status Badge */}
                      <div className="absolute top-5 left-5 z-20">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${project.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
                          {project.status === 'completed' ? 'Completed' : 'In Progress'}
                        </div>
                      </div>

                      {/* Location Badge */}
                      <div className="absolute top-5 right-5 z-20">
                        <div className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 border border-white/20">
                          <MapPinIcon className="w-3.5 h-3.5" />
                          {project.location.split(',')[0]}
                        </div>
                      </div>

                      {/* Image count badge */}
                      <div className="absolute top-14 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white/80 flex items-center gap-1">
                          <PhotoIcon className="w-3 h-3" />
                          {project.images.length} photos
                        </div>
                      </div>

                      {/* Content at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 z-20">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {/* Category tag */}
                          <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                            {project.category}
                          </span>

                          {/* Title */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                            {project.title}
                          </h3>

                          {/* Description - reveals on hover */}
                          <div className="max-h-0 group-hover:max-h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                            <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed mb-4">
                              {project.description}
                            </p>
                          </div>

                          {/* CTA button - reveals on hover */}
                          <div className="max-h-0 group-hover:max-h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-200">
                            <button className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-all duration-300 group/btn">
                              View Project
                              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-2">No projects found matching your criteria</p>
                <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filter</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          <div className="relative z-10 container-custom text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Start Your Project?</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              From concept to completion, OCTAD Engineering delivers excellence. Let&apos;s build something extraordinary together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-secondary hover:text-white transition-all duration-500 shadow-2xl hover:shadow-secondary/30 hover:scale-105 transform"
            >
              Get a Free Quote
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main >

      <Footer />

      {/* Project Details Modal */}
      {
        showDetailsModal && selectedProject && (
          <ProjectDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            project={{
              _id: selectedProject.id,
              title: selectedProject.title,
              description: selectedProject.description,
              images: selectedProject.images.map(url => ({ url, alt: selectedProject.title, isPrimary: false })),
              status: selectedProject.status as any,
              category: selectedProject.category,
              location: selectedProject.location,
              client: 'Confidential',
              isFeature: false
            }}
          />
        )
      }
    </>
  )
}
