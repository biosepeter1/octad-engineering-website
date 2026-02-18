import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us — Octad Engineering | Our Story & Mission',
    description:
        'Learn about Octad Engineering — our mission, vision, core values, and the experienced team behind Nigeria\'s trusted construction company.',
    openGraph: {
        title: 'About Us — Octad Engineering',
        description:
            'Discover our story, mission, and the values that drive Octad Engineering to deliver exceptional construction services across Nigeria.',
        type: 'website',
    },
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
