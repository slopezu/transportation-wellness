import React from 'react';
import { Inter } from 'next/font/google';
import { GoogleMapsProvider } from '@/components/GoogleMapsContext';
import ClientLayout from "@/components/ClientLayout";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "../globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wellness Transportation',
  description: 'Innovative transportation solutions for your wellness journey',
  metadataBase: new URL('https://transportation-wellness.com'),
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <GoogleMapsProvider>
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