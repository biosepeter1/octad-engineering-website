import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Projects — Octad Engineering | Portfolio',
    description:
        'Browse Octad Engineering\'s portfolio of completed and ongoing construction projects — residential, commercial, industrial, and renovation work across Nigeria.',
    openGraph: {
        title: 'Our Projects — Octad Engineering',
        description:
            'View our impressive portfolio of construction projects showcasing quality craftsmanship and innovative building solutions.',
        type: 'website',
    },
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
