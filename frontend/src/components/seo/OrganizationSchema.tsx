import React from 'react'

const OrganizationSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'OCTAD Engineering Limited',
        'url': 'https://octadengineering.com',
        'logo': 'https://octadengineering.com/logo_blue_no_bg.png',
        'contactPoint': [
            {
                '@type': 'ContactPoint',
                'telephone': '+234-805-555-5555', // Placeholder, should be updated with real data if possible
                'contactType': 'customer service',
                'areaServed': 'NG',
                'availableLanguage': 'English'
            }
        ],
        'sameAs': [
            'https://www.facebook.com/octadengineering',
            'https://www.instagram.com/octadengineering',
            'https://www.linkedin.com/company/octad-engineering-limited'
        ],
        'description': 'A Nigeria Incorporated company dedicated to engineering construction excellence. Building Design, General Contracting, Renovation, Project Management.',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Lagos',
            'addressCountry': 'NG'
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export default OrganizationSchema
