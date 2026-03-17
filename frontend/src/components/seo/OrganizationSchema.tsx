import React from 'react'

const OrganizationSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://octadengineering.com/#organization',
        'name': 'OCTAD Engineering Limited',
        'alternateName': ['Octad Engineering', 'OCTAD Engineering', 'Octad'],
        'url': 'https://octadengineering.com',
        'logo': {
            '@type': 'ImageObject',
            'url': 'https://octadengineering.com/logo_blue_no_bg.png',
            'width': 200,
            'height': 200
        },
        'image': 'https://octadengineering.com/og-image.png',
        'description': 'OCTAD Engineering Limited is a Nigeria-incorporated construction company providing Building Design, General Contracting, Renovation, Project Management, Interior Design, and Maintenance & Facilities Management services across Nigeria.',
        'foundingDate': '2016',
        'numberOfEmployees': {
            '@type': 'QuantitativeValue',
            'value': 50
        },
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Alapere-Ketu',
            'addressLocality': 'Lagos',
            'addressRegion': 'Lagos State',
            'addressCountry': 'NG'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '6.5944',
            'longitude': '3.3792'
        },
        'telephone': ['+2347012629438', '+2347062404255'],
        'email': 'octadengineering@gmail.com',
        'contactPoint': [
            {
                '@type': 'ContactPoint',
                'telephone': '+234-701-262-9438',
                'contactType': 'customer service',
                'areaServed': 'NG',
                'availableLanguage': 'English'
            },
            {
                '@type': 'ContactPoint',
                'telephone': '+234-706-240-4255',
                'contactType': 'sales',
                'areaServed': 'NG',
                'availableLanguage': 'English'
            }
        ],
        'openingHours': ['Mo-Fr 08:00-17:00', 'Sa 09:00-14:00'],
        'priceRange': '₦₦₦',
        'currenciesAccepted': 'NGN',
        'paymentAccepted': 'Bank Transfer, Cash',
        'areaServed': [
            'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Nigeria'
        ],
        'serviceArea': {
            '@type': 'Country',
            'name': 'Nigeria'
        },
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Construction Services',
            'itemListElement': [
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Building Design' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'General Contracting' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Renovation' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Project Management' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Interior Design' } },
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Maintenance & Facilities Management' } },
            ]
        },
        'sameAs': [
            'https://www.facebook.com/octadengineering',
            'https://www.instagram.com/octadengineering',
            'https://www.linkedin.com/company/octad-engineering-limited'
        ],
        'award': 'COREN Registered, NSE Corporate Member',
        'knowsAbout': [
            'Construction', 'Building Design', 'Civil Engineering',
            'Project Management', 'Interior Design', 'Renovation', 'Nigeria Construction'
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export default OrganizationSchema
