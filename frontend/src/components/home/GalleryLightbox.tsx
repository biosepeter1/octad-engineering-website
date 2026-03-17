'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface GalleryLightboxProps {
    isOpen: boolean
    onClose: () => void
    images: string[]
    title: string
    startIndex?: number
}

export default function GalleryLightbox({ isOpen, onClose, images, title, startIndex = 0 }: GalleryLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(startIndex)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen, startIndex])

    const goTo = useCallback((index: number) => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex(index)
        setTimeout(() => setIsAnimating(false), 300)
    }, [isAnimating])

    const next = useCallback(() => {
        goTo((currentIndex + 1) % images.length)
    }, [currentIndex, images.length, goTo])

    const prev = useCallback(() => {
        goTo((currentIndex - 1 + images.length) % images.length)
    }, [currentIndex, images.length, goTo])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') next()
            if (e.key === 'ArrowLeft') prev()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, next, prev])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95" onClick={onClose}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3">
                    <h3 className="text-white font-semibold text-sm sm:text-lg truncate max-w-[200px] sm:max-w-md">{title}</h3>
                    <span className="text-gray-400 text-xs sm:text-sm">{currentIndex + 1} / {images.length}</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                    <XMarkIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
            </div>

            {/* Main Image Area */}
            <div
                className="flex-1 relative flex items-center justify-center px-2 sm:px-12 pb-2"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Arrow */}
                <button
                    onClick={prev}
                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white p-2 sm:p-3 rounded-full transition-all backdrop-blur-sm"
                >
                    <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Image */}
                <div className="relative w-full h-full max-w-5xl mx-auto">
                    <Image
                        src={images[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1}`}
                        fill
                        className={`object-contain transition-opacity duration-300 ${isAnimating ? 'opacity-70' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                    />
                </div>

                {/* Right Arrow */}
                <button
                    onClick={next}
                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white p-2 sm:p-3 rounded-full transition-all backdrop-blur-sm"
                >
                    <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Thumbnail Strip */}
            <div
                className="pb-3 sm:pb-4 px-4 overflow-x-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex gap-1.5 sm:gap-2 justify-center max-w-4xl mx-auto">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`flex-shrink-0 relative w-12 h-9 sm:w-16 sm:h-12 rounded-md overflow-hidden transition-all duration-200 ${
                                index === currentIndex
                                    ? 'ring-2 ring-primary scale-105 opacity-100'
                                    : 'opacity-50 hover:opacity-80'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
