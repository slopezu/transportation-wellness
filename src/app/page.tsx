import React from 'react';
import HeroArea from '@/components/HeroArea';
import About from '@/components/About';
import Features from '@/components/Features';
import WorkProcess from '@/components/WorkProcess';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroArea />
      <WorkProcess />
      <About />
      <Features />
      <Contact />
    </main>
  );
}