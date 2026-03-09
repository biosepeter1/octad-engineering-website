import { MetadataRoute } from 'next'
import { projectsAPI } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://octadengineering.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/projects',
        '/contact',
        '/philosophy',
        '/success-stories',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic project routes
    let projectRoutes: MetadataRoute.Sitemap = []
    try {
        const response = await projectsAPI.getProjects()
        if (response.success && response.data) {
            projectRoutes = response.data.map((project: any) => ({
                url: `${baseUrl}/projects/${project._id}`,
                lastModified: new Date(project.updatedAt || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }))
        }
    } catch (error) {
        console.error('Sitemap: Failed to fetch projects', error)
    }

    return [...routes, ...projectRoutes]
}
