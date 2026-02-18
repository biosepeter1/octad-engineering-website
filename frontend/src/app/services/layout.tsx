import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Services — Octad Engineering | Construction & Building',
    description:
        'Explore Octad Engineering\'s full range of construction services — from residential builds and commercial projects to renovations and industrial facilities.',
    openGraph: {
        title: 'Our Services — Octad Engineering',
        description:
            'Professional construction services including residential, commercial, renovation, and industrial projects delivered with quality craftsmanship.',
        type: 'website',
    },
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
