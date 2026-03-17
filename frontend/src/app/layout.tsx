import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
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
    default: 'OCTAD Engineering Limited | Construction Company Nigeria',
    template: '%s | OCTAD Engineering Limited'
  },
  description: 'OCTAD Engineering Limited is a Nigeria-incorporated construction company offering Building Design, General Contracting, Renovation, Project Management, Interior Design and Maintenance services. Founded in 2016, serving Lagos, Abuja and all major Nigerian cities.',
  keywords: [
    'OCTAD', 'Octad Engineering', 'OCTAD Engineering Limited', 'Octad Engineering Nigeria',
    'construction company Nigeria', 'building design Lagos', 'general contracting Nigeria',
    'renovation Lagos', 'project management Nigeria', 'interior design Lagos',
    'maintenance Nigeria', 'engineering company Lagos', 'construction Lagos',
    'building contractor Abuja', 'Octad construction', 'COREN registered contractor Nigeria',
    'NSE member contractor Lagos', 'Alapere Ketu Lagos construction', 'best construction company Nigeria'
  ],
  authors: [{ name: 'OCTAD Engineering Limited', url: 'https://octadengineering.com' }],
  creator: 'OCTAD Engineering Limited',
  publisher: 'OCTAD Engineering Limited',
  category: 'Construction & Engineering',
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
    title: 'OCTAD Engineering Limited | Leading Construction Company in Nigeria',
    description: 'OCTAD Engineering Limited — Nigeria\'s trusted construction company. Building Design, General Contracting, Renovation, Project Management across Lagos, Abuja & beyond.',
    url: 'https://octadengineering.com',
    siteName: 'OCTAD Engineering Limited',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OCTAD Engineering Limited - Professional Construction Services Nigeria',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCTAD Engineering Limited | Construction Company Nigeria',
    description: 'Nigeria\'s leading construction company. Quality building design, contracting & renovation services since 2016.',
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
    canonical: 'https://octadengineering.com',
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
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <OrganizationSchema />
            {children}
          </AuthProvider>
        </ThemeProvider>
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