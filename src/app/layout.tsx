import React from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';
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
    default: 'Wellness Transportation | Shuttle Service - Guanacaste and San Jose',
    template: '%s | Wellness Transportation'
  },
  description: 'Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.',
  keywords: [
    'airport shuttle Costa Rica',
    'Liberia airport shuttle',
    'Guanacaste airport shuttle',
    'Nosara airport transfers',
    'Hospital shuttle home',
    'Santa Teresa shuttle transportation',
    'Hermosa beach airport transfers',
    'Avellanas, Potrero, Brasilito, Flamingo beach airport shuttle',
    'San José airport shuttle',
    'private transfers Costa Rica',
    'Ocotal shuttle Coco',
    'Arenal Volcano shuttle',
    'Monteverde transportation',
    'Tamarindo shuttle',
    'Guanacaste airport',
    'LIR Daniel Oduber Quiros',
    'SJO Juan Santamaria'
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://transportation-wellness.com',
    siteName: 'Wellness Transportation CR',
    images: [
      {
        url: 'https://transportation-wellness.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Easy online booking. Select your locations on the map and get the quote automatically for airport transfers, hotel shuttles, and custom tours anywhere in Costa Rica.'
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
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://transportation-wellness.com'
  }
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-745659643"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-745659643');
          `}
        </Script>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <GoogleMapsProvider>
          <JsonLd />
          <Header />
          <ClientLayout>
            <main className="flex-grow pt-16">
              {children}
            </main>
          </ClientLayout>
          <Footer />
        </GoogleMapsProvider>
        <Script id="google-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {
                'send_to': 'AW-745659643/xcD7CMfQ4eUZEPu5x-MC',
                'value': 1.0,
                'currency': 'USD'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
