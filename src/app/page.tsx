import React from 'react';
import { Metadata } from 'next';
import HeroArea from '@/components/HeroArea';
import About from '@/components/About';
import Features from '@/components/Features';
import WorkProcess from '@/components/WorkProcess';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Wellness Transportation | Shuttle Service - Guanacaste and San Jose',
  description: 'Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.',
  openGraph: {
    title: 'Wellness Transportation | Shuttle Service - Guanacaste and San Jose',
    description: 'Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.',
    images: [
      {
        url: 'https://transportation-wellness.com/home-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wellness Transportation - Easy booking online - Guanacaste and San Jose Shuttle Service'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Transportation | Shuttle Service - Guanacaste and San Jose',
    description: 'Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.',
    images: ['https://transportation-wellness.com/home-twitter-image.jpg'],
  },
}

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wellness Transportation",
    "description": "Shuttle Service - Guanacaste and San Jose",
    "url": "https://transportation-wellness.com",
    "mainEntity": {
      "@type": "TransportationService",
      "name": "Wellness Transportation",
      "description": "Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.",
      "areaServed": "Costa Rica",
      "serviceType": ["Airport Transfers", "Hotel Shuttle", "Guanacaste shuttle"],
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
