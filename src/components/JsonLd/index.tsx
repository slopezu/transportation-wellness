export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    "name": "Wellness Transportation",
    "image": "https://transportation-wellness.com/logo.png",
    "description": "Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.",
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
    "areaServed": "Costa Rica",
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
    "logo": "https://transportation-wellness.com/logo.png"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
