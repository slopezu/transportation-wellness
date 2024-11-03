'use client'

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white py-4 border-t border-stroke dark:border-stroke-dark">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Wellness Transportation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}