import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Success Stories — Octad Engineering | Client Testimonials',
    description:
        'Read success stories and testimonials from satisfied Octad Engineering clients. See how we\'ve delivered outstanding results on projects across Nigeria.',
    openGraph: {
        title: 'Success Stories — Octad Engineering',
        description:
            'Discover how Octad Engineering has transformed visions into reality through featured project stories and client testimonials.',
        type: 'website',
    },
}

export default function SuccessStoriesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
