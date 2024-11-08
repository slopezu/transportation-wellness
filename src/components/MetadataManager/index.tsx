'use client'

import React from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface MetadataManagerProps {
  title?: string
  description?: string
  keywords?: string[]
}

const defaultKeywords = [
  "Costa Rica shuttle",
  "Liberia airport service",
  "Nosara shuttle service",
  "Tamarindo shuttle ",
  "Arenal Monteverde transportation",
  "airport transfer",
  "eco-friendly transportation",
  "Guanacaste  airport shuttle",
  "private minivan Costa Rica",
    'airport shuttle Costa Rica',
    'Liberia airport transfers',
    'Nosara airport transfers',
    'Hospital shuttle home',
    'Santa Teresa shuttle transportation',
    'Hermosa beach airport transfers',
    'Avellanas, Potrero, Brasilito,Flamingo beach airport shuttle',
    'San José airport shuttle',
    'private transfers Costa Rica',
    'Ocotal shuttle Coco',
    'Arenal Volcano shuttle',
    'Monteverde transportation',
    'Tamarindo shuttle',
    'Guanacaste airport',
    'Lir Daniel Oduber Quiros Lir',
    'Sjo Juan Santamaria Sjo'
]

export default function MetadataManager({
  title = "Wellness Transportation | Guanacaste (Lir) & San Jose (Sjo) Shuttle Service - Easy booking online",
  description = "Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.",
  keywords = []
}: MetadataManagerProps) {
  const pathname = usePathname()
  const canonicalUrl = `https://transportation-wellness.com${pathname}`

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ')

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
