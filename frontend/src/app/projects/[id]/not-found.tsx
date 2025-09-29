import Link from 'next/link'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <ExclamationTriangleIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Not Found</h1>
            <p className="text-gray-600">
              The project you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects" 
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <Link 
              href="/" 
              className="btn-outline"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}