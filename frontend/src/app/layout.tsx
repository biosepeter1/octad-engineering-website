import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'OCTAD Engineering Limited - Professional Construction Services',
  description: 'OCTAD Engineering Limited - A Nigeria Incorporated company dedicated to engineering construction excellence. Building Design, General Contracting, Renovation, Project Management.',
  keywords: 'OCTAD Engineering, construction, building design, general contracting, renovation, project management, interior design, Nigeria',
  authors: [{ name: 'OCTAD Engineering Limited' }],
  icons: {
    icon: '/logo_blue_no_bg.png',
    apple: '/logo_blue_no_bg.png',
  },
  openGraph: {
    title: 'OCTAD Engineering Limited - Professional Construction Services',
    description: 'A Nigeria Incorporated company dedicated to engineering construction excellence.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <AuthProvider>
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