'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useGoogleMaps } from '../GoogleMapsContext'

export default function MapComponent({ origin, destination }) {
  const { isLoaded, loadError } = useGoogleMaps()
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const directionsRendererRef = useRef(null)
  const markersRef = useRef([])
  const [mapReady, setMapReady] = useState(false)
  const mapId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`)

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []
  }, [])

  const createMarker = useCallback((position) => {
    if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
      return new window.google.maps.marker.AdvancedMarkerElement({
        position: position,
        map: mapInstanceRef.current
      })
    } else {
      return new window.google.maps.Marker({
        position: position,
        map: mapInstanceRef.current
      })
    }
  }, [])

  useEffect(() => {
    if (isLoaded && !mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.7489, lng: -83.7534 },
        zoom: 8,
        mapId: mapId.current,
      })
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer()
      directionsRendererRef.current.setMap(mapInstanceRef.current)
      setMapReady(true)
    }
  }, [isLoaded])

  useEffect(() => {
    if (!mapReady) return

    clearMarkers()
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] })
    }

    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService()
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(result)
          } else {
            console.error('Error al calcular la ruta:', status)
          }
        }
      )
    } else {
      const bounds = new window.google.maps.LatLngBounds()

      if (origin) {
        const position = new window.google.maps.LatLng(origin.lat, origin.lng)
        const marker = createMarker(position)
        markersRef.current.push(marker)
        bounds.extend(position)
      }
      
      if (destination) {
        const position = new window.google.maps.LatLng(destination.lat, destination.lng)
        const marker = createMarker(position)
        markersRef.current.push(marker)
        bounds.extend(position)
      }

      if (origin || destination) {
        mapInstanceRef.current.fitBounds(bounds)
      } else {
        mapInstanceRef.current.setCenter({ lat: 9.7489, lng: -83.7534 })
        mapInstanceRef.current.setZoom(8)
      }
    }
  }, [mapReady, origin, destination, clearMarkers, createMarker])

  if (loadError) {
    return <div>Error al cargar Google Maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div>Cargando Google Maps...</div>
  }

  return <div ref={mapRef} id={mapId.current} style={{ width: '100%', height: '400px' }} />
}