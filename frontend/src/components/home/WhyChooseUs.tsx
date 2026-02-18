'use client'

import {
    WrenchScrewdriverIcon,
    UserGroupIcon,
    ClockIcon,
    LightBulbIcon,
    HeartIcon,
} from '@heroicons/react/24/outline'

export default function WhyChooseUs() {
    return (
        <section className="section-padding bg-gray-50 relative overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="animate-slide-in-left">
                        <div className="mb-8 lg:mb-12">
                            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Why Choose <span className="text-primary">Octad Engineering</span>?
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                                We start by understanding your vision — what you hope to create, feel, and achieve.
                                We believe design should begin with empathy. We aim to see what you see and feel what you feel,
                                before we shape anything.
                            </p>
                        </div>

                        <div className="space-y-6 lg:space-y-8">
                            <div className="flex items-start group">
                                <div className="bg-primary text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-secondary transition-colors duration-300 shadow-lg flex-shrink-0">
                                    <WrenchScrewdriverIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors">Quality Work</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        Uncompromising quality standards with rigorous testing and inspection at every phase.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-secondary text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg flex-shrink-0">
                                    <UserGroupIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors">Experienced Team</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        Certified professionals with over 25 years of combined experience in construction excellence.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-accent text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg flex-shrink-0">
                                    <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors">Timely Delivery</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        On-schedule completion guaranteed with detailed project management and milestone tracking.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-green-500 text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg flex-shrink-0">
                                    <LightBulbIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors">Innovative Solutions</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        Cutting-edge technology and modern construction methods for superior results.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-pink-500 text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-primary transition-colors duration-300 shadow-lg flex-shrink-0">
                                    <HeartIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors">Customer Focused</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        Your vision is our priority with personalized service and constant communication.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="relative animate-slide-in-right mt-8 lg:mt-0">
                        <div className="relative z-10">
                            <img
                                src="/portfolio/page5_img1.jpg"
                                alt="Gbolahan Alimi - CEO, OCTAD Engineering"
                                className="rounded-2xl shadow-2xl w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover object-top transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {/* Decorative Elements - Hidden on small screens */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-secondary rounded-full opacity-20 animate-pulse hidden sm:block"></div>
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-primary rounded-full opacity-10 hidden sm:block"></div>
                        <div className="absolute top-1/2 -right-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent rounded-full opacity-30 animate-bounce hidden sm:block"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
