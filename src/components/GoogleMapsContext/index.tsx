'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({ isLoaded: false, loadError: null })

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: '3.55',
      libraries: ['places']
    })

    loader.load()
      .then(() => {
        setIsLoaded(true)
      })
      .catch((err: Error) => {
        setLoadError(err)
      })
  }, [])

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export function useGoogleMaps(): GoogleMapsContextType {
  const context = useContext(GoogleMapsContext)
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider')
  }
  return context
}