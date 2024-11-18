export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    "name": "Wellness Transportation",
    "image": "https://transportation-wellness.com/logo.png",
    "description": "Professional private shuttle service in Costa Rica. Easy online booking for airport transfers, hotel shuttles, and custom tours in Guanacaste, San José, La Fortuna, and nationwide.",
    "@id": "https://transportation-wellness.com",
    "url": "https://transportation-wellness.com",
    "telephone": "+506 89680765",
    "email": "reservations@transportation-wellness.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Liberia, Guanacaste",
      "addressLocality": "Liberia",
      "addressRegion": "Guanacaste",
      "postalCode": "50101",
      "addressCountry": "CR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.6326807,
      "longitude": -85.4404804
    },
    "areaServed": {
      "@type": "Country",
      "name": "Costa Rica"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 10.6326807,
        "longitude": -85.4404804
      },
      "geoRadius": "300000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/WellnessTransportationCR/",
      "https://www.instagram.com/wellnesstransportationcr",
      "https://maps.app.goo.gl/VW1oAdrJ88Td5E2XA"
    ],
    "logo": "https://transportation-wellness.com/logo.png",
    "availableLanguage": ["English", "Spanish"],
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "USD, CRC",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Transportation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Airport Transfers",
            "description": "Private shuttle service to and from Costa Rica airports"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hotel Shuttle Service",
            "description": "Comfortable transportation between hotels and resorts in Costa Rica"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Easy online booking",
            "description": "Personalized transportation, select your location on the map and get the rate automatically"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
