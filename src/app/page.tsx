import React from 'react';
import { Metadata } from 'next';
import HeroArea from '@/components/HeroArea';
import About from '@/components/About';
import Features from '@/components/Features';
import WorkProcess from '@/components/WorkProcess';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Wellness Transportation | Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online',
  description: 'Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.',
  openGraph: {
    title: 'Wellness Transportation | Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online',
    description: 'Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.. Lir & Sjo.',
    images: [
      {
        url: 'https://transportation-wellness.com/home-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wellness Transportation - Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Transportation | Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online',
    description: 'Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.. Lir & Sjo.',
    images: ['https://transportation-wellness.com/home-twitter-image.jpg'],
  },
}

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wellness Transportation CR- Home",
    "description": "Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online",
    "url": "https://transportation-wellness.com",
    "mainEntity": {
      "@type": "TransportationService",
      "name": "Wellness Transportation CR",
      "description": "Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica",
      "areaServed": "Costa Rica",
      "serviceType": ["Airport Transfers", "Hotel Shuttles", "Custom Tours"],
      "availableLanguage": ["Spanish", "English"],
      "priceRange": "$$",
      "telephone": "+506 89680765",
      "email": "reservations@transportation-wellness.com"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="flex flex-col min-h-screen">
        <HeroArea />
        <WorkProcess />
        <About />
        <Features />
        <Contact />
      </main>
    </>
  );
}
