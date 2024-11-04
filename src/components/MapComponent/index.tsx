'use client'

import { useEffect, useRef, useState } from 'react'
import { useGoogleMaps } from '../GoogleMapsContext'

export default function MapComponent({ origin, destination }) {
  const { isLoaded, loadError } = useGoogleMaps()
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.7489, lng: -83.7534 },
        zoom: 8,
        gestureHandling: 'cooperative',
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
      })
      setMap(newMap)
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer()
      newDirectionsRenderer.setMap(newMap)
      setDirectionsRenderer(newDirectionsRenderer)
    }
  }, [isLoaded, map])

  useEffect(() => {
    if (map && directionsRenderer && origin && destination) {
      const directionsService = new window.google.maps.DirectionsService()
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result)
          } else {
            console.error('Error al calcular la ruta:', status)
          }
        }
      )
    }
  }, [map, directionsRenderer, origin, destination])

  useEffect(() => {
    if (map) {
      window.google.maps.event.trigger(map, 'resize')
      if (origin && destination) {
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(new window.google.maps.LatLng(origin.lat, origin.lng))
        bounds.extend(new window.google.maps.LatLng(destination.lat, destination.lng))
        map.fitBounds(bounds)
      }
    }
  }, [map, origin, destination])

  if (loadError) {
    return <div>Error al cargar Google Maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div>Cargando Google Maps...</div>
  }

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '300px',
      }} 
    />
  )
}