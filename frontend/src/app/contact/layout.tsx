import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us — Octad Engineering | Get a Free Quote',
    description:
        'Reach out to Octad Engineering for a free project consultation and quote. Visit our office, call us, or fill out our contact form today.',
    openGraph: {
        title: 'Contact Us — Octad Engineering',
        description:
            'Get in touch with Octad Engineering for your next construction project. Free consultations and competitive quotes available.',
        type: 'website',
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
