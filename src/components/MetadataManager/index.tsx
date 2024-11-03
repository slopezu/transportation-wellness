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
  "private minivan Costa Rica"
]

export default function MetadataManager({
  title = "Wellness Transportation | Hotel airport Shuttle in Costa Rica",
  description = "Experience comfortable and easy shuttle transportation across Costa Rica with Wellness Transportation. Book your eco-friendly ride today!",
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