import React from 'react'

const OrganizationSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'OCTAD Engineering Limited',
        'url': 'https://octadengineering.com',
        'logo': 'https://octadengineering.com/logo-solid.png',
        'contactPoint': [
            {
                '@type': 'ContactPoint',
                'telephone': '+234-701-262-9438',
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
