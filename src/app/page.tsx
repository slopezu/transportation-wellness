import React from 'react';
import { Metadata } from 'next';
import HeroArea from '@/components/HeroArea';
import About from '@/components/About';
import Features from '@/components/Features';
import WorkProcess from '@/components/WorkProcess';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Wellness Transportation | Eco-Friendly Shuttle Services in Costa Rica',
  description: 'Experience reliable, sustainable, and comfortable shuttle transportation services for all your Costa Rica travel needs. Book your eco-friendly ride with Wellness Transportation today!',
  openGraph: {
    title: 'Wellness Transportation | Eco-Friendly Shuttle Services in Costa Rica',
    description: 'Book your eco-friendly shuttle service for reliable and comfortable transportation across Costa Rica. Airport transfers, hotel shuttles, and custom tours available.',
    images: [
      {
        url: 'https://transportation-wellness.com/home-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wellness Transportation Costa Rica - Eco-Friendly Shuttle Services'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Transportation | Eco-Friendly Shuttle Services in Costa Rica',
    description: 'Book your eco-friendly shuttle service for reliable and comfortable transportation across Costa Rica. Airport transfers, hotel shuttles, and custom tours available.',
    images: ['https://transportation-wellness.com/home-twitter-image.jpg'],
  },
}

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wellness Transportation - Home",
    "description": "Eco-friendly shuttle transportation services in Costa Rica",
    "url": "https://transportation-wellness.com",
    "mainEntity": {
      "@type": "TransportationService",
      "name": "Wellness Transportation",
      "description": "Reliable and sustainable shuttle services across Costa Rica",
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