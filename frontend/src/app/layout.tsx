import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Construction Company - Professional Building Services',
  description: 'Professional construction services for residential and commercial projects. Quality craftsmanship, reliable service, and competitive pricing.',
  keywords: 'construction, building, renovation, contractor, residential, commercial',
  authors: [{ name: 'Construction Company' }],
  openGraph: {
    title: 'Construction Company - Professional Building Services',
    description: 'Professional construction services for residential and commercial projects.',
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