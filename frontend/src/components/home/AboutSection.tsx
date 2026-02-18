'use client'

export default function AboutSection() {
    return (
        <section id="about" className="py-16 sm:py-24 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                            Who Is <span className="text-primary">OCTAD</span>?
                        </h2>
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                            <p>
                                OCTAD Engineering Limited is a Nigeria Incorporated company and locally owned.
                                The company offers Engineering Construction and Construction Project Management.
                            </p>
                            <p>
                                OCTAD is dedicated to organizations or individuals seeking construction services.
                                We provide engineering construction services to power distribution and transmission companies,
                                parastatals, oil and pipeline companies, public works agencies, municipalities, and
                                commercial/residential real estate developers.
                            </p>
                            <p>
                                Our area of expertise includes but is not limited to building technology, civil and structural engineering.
                                We are committed to providing the best possible construction expertise & service to ensure cost effective and successful projects.
                            </p>
                        </div>

                    </div>

                    {/* Image */}
                    <div className="relative h-[400px] lg:h-[500px] bg-gray-100 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                        <img
                            src="/portfolio/page8_img7.jpg"
                            alt="OCTAD Engineering Team"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Solid accent border */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gray-900 -z-10 group-hover:bottom-[-20px] group-hover:right-[-20px] transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
