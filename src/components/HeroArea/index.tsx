'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useGoogleMaps } from '@/components/GoogleMapsContext';
import MapComponent from '@/components/MapComponent';
import ReservationForm from '@/components/ReservationForm';
import MetadataManager from '@/components/MetadataManager';

export default function HeroArea() {
  const { isLoaded, loadError } = useGoogleMaps()
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [mapPoints, setMapPoints] = useState({ origin: null, destination: null })
  const [quotationResult, setQuotationResult] = useState(null)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const originRef = useRef(null)
  const destinationRef = useRef(null)

  useEffect(() => {
    if (isLoaded && window.google) {
      const setupAutocomplete = (inputRef, setAddress, setPoint) => {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "cr" },
          fields: ["formatted_address", "geometry"],
        })

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (place.geometry && place.geometry.location) {
            setAddress(place.formatted_address)
            const newPoint = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
            setPoint(newPoint)
          }
        })
      }

      setupAutocomplete(
        originRef,
        setOrigin,
        (location) => setMapPoints(prev => ({ ...prev, origin: location }))
      )

      setupAutocomplete(
        destinationRef,
        setDestination,
        (location) => setMapPoints(prev => ({ ...prev, destination: location }))
      )
    }
  }, [isLoaded])

  const handleQuotation = () => {
    if (mapPoints.origin && mapPoints.destination) {
      const service = new window.google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins: [mapPoints.origin],
          destinations: [mapPoints.destination],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            const distanceInKm = response.rows[0].elements[0].distance.value / 1000
            const price = distanceInKm * 500 // 500 colones por kilómetro
            setQuotationResult({ origin, destination, distance: distanceInKm, price })
            setShowReservationForm(true)
          } else {
            console.error('Error al calcular la distancia:', status)
            alert('No se pudo calcular la distancia. Por favor, intente de nuevo.')
          }
        }
      )
    } else {
      alert('Por favor, ingrese un origen y un destino válidos.')
    }
  }

  const handleReservation = (data: any) => {
    console.log("Reserva realizada:", data)
    setShowReservationForm(false)
    setQuotationResult(null)
    setOrigin('')
    setDestination('')
    setMapPoints({ origin: null, destination: null })
  }

  const handleCancel = () => {
    setShowReservationForm(false)
    setQuotationResult(null)
  }

  if (loadError) {
    return <div>Error al cargar Google Maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div>Cargando Google Maps...</div>
  }

  return (
    <>
      <MetadataManager 
        title="Wellness Transportation | Easy booking online - Guanacaste and San Jose Shuttle Service"
        description="Select your locations on the map - Easy online booking website dedicated to the private shuttle transportation from San José, Guanacaste, La Fortuna and anywhere Costa Rica.. Lir & Sjo"
        keywords={[
          "Guanacaste airport shuttle",
          "airport shuttle Costa Rica",
          "Liberia airport transfers",
          "Nosara airport transfers",
          "Santa Teresa shuttle transportation",
          "Limon airport transfers",
          "San José airport shuttle",
          "private transfers Costa Rica",
          "shared shuttle to hotels",
          "Arenal Volcano shuttle",
          "Monteverde transportation",
          "Tamarindo shuttle",
          "the best shuttle",
          "Playa Hermosa shuttle",
          "Coco shuttle",
          "Papagayo shuttle",
          "Puntarenas shuttle",
           "Jaco shuttle",
          "Manuel Antonio shuttle",
          "eco-friendly transportation Costa Rica"
        ]}
      />
      <section className="bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('/images/hero/image.jpg')" }}>
        <div className="container mx-auto px-6">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-4xl font-bold mb-4">Welcome to Wellness Transportation</h1>
                <p className="text-xl mb-8">From Guanacaste to the world</p>
                {!showReservationForm ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Quote for Private Minivan 8 people max.</h2>
                    <div className="flex flex-col space-y-2">
                      <input
                        ref={originRef}
                        type="text"
                        placeholder="Enter the origin / Ingrese el origen"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="p-2 border rounded text-black"
                      />
                      <input
                        ref={destinationRef}
                        type="text"
                        placeholder="Enter the destination / Ingrese el destino"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="p-2 border rounded text-black"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleQuotation}
                        className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100 transition duration-300"
                      >
                        Get a Quote / Cotizar
                      </button>
                    </div>
                  </div>
                ) : (
                  <ReservationForm
                    quotationData={quotationResult}
                    onReservation={handleReservation}
                    onCancel={handleCancel}
                  />
                )}
              </div>
              <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px]">
                <MapComponent origin={mapPoints.origin} destination={mapPoints.destination} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
