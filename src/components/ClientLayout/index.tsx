'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <NextTopLoader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}