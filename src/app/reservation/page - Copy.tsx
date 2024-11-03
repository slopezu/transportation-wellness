'use client'

import React, { useState } from 'react'
import ReservationForm from '@/components/ReservationForm'
import { useRouter } from 'next/navigation'

export default function ReservationPage() {
  const [quotationData, setQuotationData] = useState({
    origin: "San José",
    destination: "Manuel Antonio",
    distance: 150,
    price: 50000
  })
  const [isReservationComplete, setIsReservationComplete] = useState(false)
  const router = useRouter()

  const handleReservation = (data: any) => {
    console.log("Reservation completed:", data)
    setIsReservationComplete(true)
  }

  const handleCancel = () => {
    router.push('/')  // Redirige al usuario a la página de inicio
  }

  if (isReservationComplete) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">¡Reserva Confirmada!</h2>
        <p className="text-lg mb-4 text-gray-700">
          Su reserva ha sido procesada exitosamente. Revise su correo electrónico para más detalles.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la página de inicio
        </button>
      </div>
    )
  }

  return (
    <ReservationForm
      quotationData={quotationData}
      onReservation={handleReservation}
      onCancel={handleCancel}
    />
  )
}