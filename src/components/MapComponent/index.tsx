'use client'

import { useEffect, useRef, useState } from 'react'
import { useGoogleMaps } from '../GoogleMapsContext'

export default function MapComponent({ origin, destination }) {
  const { isLoaded, loadError } = useGoogleMaps()
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)
  const [markers, setMarkers] = useState([])
  const mapId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    if (isLoaded && !map && mapRef.current) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.7489, lng: -83.7534 },
        zoom: 8,
        mapId: mapId.current,
      })
      setMap(newMap)
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer()
      newDirectionsRenderer.setMap(newMap)
      setDirectionsRenderer(newDirectionsRenderer)
    }
  }, [isLoaded, map])

  useEffect(() => {
    if (map && directionsRenderer) {
      // Limpiar marcadores existentes
      markers.forEach(marker => marker.setMap(null))
      setMarkers([])

      // Limpiar ruta existente
      directionsRenderer.setDirections({ routes: [] })

      if (origin && destination) {
        // Si tenemos origen y destino, dibujamos la ruta
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
      } else {
        // Si no tenemos ambos puntos, añadimos marcadores para los puntos disponibles
        const bounds = new window.google.maps.LatLngBounds()
        
        const createMarker = (position) => {
          if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
            return new window.google.maps.marker.AdvancedMarkerElement({
              position: position,
              map: map
            })
          } else {
            return new window.google.maps.Marker({
              position: position,
              map: map
            })
          }
        }

        if (origin) {
          const position = new window.google.maps.LatLng(origin.lat, origin.lng)
          const marker = createMarker(position)
          setMarkers(prev => [...prev, marker])
          bounds.extend(position)
        }
        
        if (destination) {
          const position = new window.google.maps.LatLng(destination.lat, destination.lng)
          const marker = createMarker(position)
          setMarkers(prev => [...prev, marker])
          bounds.extend(position)
        }

        if (origin || destination) {
          map.fitBounds(bounds)
        } else {
          map.setCenter({ lat: 9.7489, lng: -83.7534 })
          map.setZoom(8)
        }
      }
    }
  }, [map, directionsRenderer, origin, destination])

  if (loadError) {
    return <div>Error al cargar Google Maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div>Cargando Google Maps...</div>
  }

  return <div ref={mapRef} id={mapId.current} style={{ width: '100%', height: '400px' }} />
}