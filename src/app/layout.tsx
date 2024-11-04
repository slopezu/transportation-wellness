import React from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { GoogleMapsProvider } from '@/components/GoogleMapsContext';
import ClientLayout from "@/components/ClientLayout";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import "../globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://transportation-wellness.com'),
  title: {
    default: 'Wellness Transportation | Eco-Friendly Shuttle in Costa Rica',
    template: '%s | Wellness Transportation'
  },
  description: 'Experience reliable, sustainable, and comfortable shuttle transportation services for all your Costa Rica travel needs. Book your eco-friendly ride with Wellness Transportation today!',
  keywords: [
    'airport shuttle Costa Rica',
    'Liberia airport transfers',
    'Nosara airport transfers',
    'Hospital shuttle home',
    'Santa Teresa shuttle transportation',
    'beach airport transfers',
    'Avellanas, Potrero, Brasilito,Flamingo beach airport shuttle',
    'San José airport shuttle',
    'private transfers Costa Rica',
    'shared shuttle to hotels',
    'Arenal Volcano shuttle',
    'Monteverde transportation',
    'Tamarindo shuttle',
    'Guanacaste airport',
    'eco-friendly transportation Costa Rica'
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://transportation-wellness.com',
    siteName: 'Wellness Transportation',
    images: [
      {
        url: 'https://transportation-wellness.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wellness Transportation Costa Rica'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WellnessTransportCR',
    creator: '@WellnessTransportCR'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://transportation-wellness.com'
  }
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    "name": "Wellness Transportation",
    "description": "Eco-friendly shuttle transportation services in Costa Rica",
    "areaServed": "Costa Rica",
    "url": "https://transportation-wellness.com",
    "logo": "https://transportation-wellness.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/WellnessTransportationCR",
      "https://www.instagram.com/wellnesstransportationcr",
      "https://twitter.com/WellnessTransportCR"
    ]
  };

  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <GoogleMapsProvider>
          <JsonLd data={jsonLdData} />
          <Header />
          <ClientLayout>
            <main className="flex-grow pt-16">
              {children}
            </main>
          </ClientLayout>
          <Footer />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}