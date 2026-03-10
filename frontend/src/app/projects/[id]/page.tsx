import { Metadata } from 'next'
import { projectsAPI } from '@/lib/api'
import { transformProjectImages } from '@/utils/imageUtils'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id
  try {
    const response = await projectsAPI.getProject(id)
    if (response.success && response.data) {
      const project = response.data
      return {
        title: project.title,
        description: project.description.substring(0, 160),
        openGraph: {
          title: project.title,
          description: project.description.substring(0, 160),
          images: project.images?.map((img: any) => ({
            url: img.url,
            alt: img.alt || project.title
          })) || [],
        },
      }
    }
  } catch (error) {
    console.error('Metadata Error:', error)
  }

  return {
    title: 'Project Details',
    description: 'View project details from OCTAD Engineering Limited.',
  }
}

import ProjectDetailsClient from './ProjectDetailsClient'

export default function ProjectDetailsPage() {
  return <ProjectDetailsClient />
}
