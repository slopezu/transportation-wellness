'use client'

import React from 'react';
import NextTopLoader from 'nextjs-toploader';

export default function NextTopLoaderWrapper() {
  return (
    <NextTopLoader
      color="#006BFF"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #006BFF,0 0 5px #006BFF"
    />
  );
}