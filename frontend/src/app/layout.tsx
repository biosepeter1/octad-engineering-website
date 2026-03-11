import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://octadengineering.com'),
  title: {
    default: 'OCTAD Engineering Limited - Professional Construction Services',
    template: '%s | OCTAD Engineering Limited'
  },
  description: 'OCTAD Engineering Limited - A Nigeria Incorporated company dedicated to engineering construction excellence. Building Design, General Contracting, Renovation, Project Management.',
  keywords: 'OCTAD Engineering, construction, building design, general contracting, renovation, project management, interior design, Nigeria, Lagos engineering',
  authors: [{ name: 'OCTAD Engineering Limited' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo_blue_no_bg.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/logo_blue_no_bg.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'OCTAD Engineering Limited - Professional Construction Services',
    description: 'A Nigeria Incorporated company dedicated to engineering construction excellence.',
    url: 'https://octadengineering.com',
    siteName: 'OCTAD Engineering Limited',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OCTAD Engineering Limited - Professional Construction Services',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCTAD Engineering Limited',
    description: 'A Nigeria Incorporated company dedicated to engineering construction excellence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'i_bQwiHMNUdeyw1zlcI2kkvvGNipImqA1sVZryK36vk',
  },
}

import OrganizationSchema from '@/components/seo/OrganizationSchema'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <OrganizationSchema />
          {children}
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}