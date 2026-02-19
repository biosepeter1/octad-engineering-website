

export default function FounderSection() {
    return (
        <section id="founder" className="py-16 sm:py-24 bg-gray-50">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        {/* Image */}
                        <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 relative">
                            <img
                                src="/portfolio/page5_img1.jpg"
                                alt="Gbolahan Alimi - CEO"
                                className="w-full h-full object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary -z-10"></div>
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
                                Gbolahan Alimi
                            </h2>
                            <p className="text-primary font-medium mb-6 uppercase tracking-wider text-sm">
                                Managing Director / CEO
                            </p>
                            <div className="text-gray-700 leading-relaxed font-light space-y-4">
                                <p>
                                    With over a decade of experience in construction and interior design, I provide customized solutions for businesses — from functional factories to employee-friendly workspaces — and also craft dream homes for individuals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
