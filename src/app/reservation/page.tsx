'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReservationForm from '@/components/ReservationForm'

export default function ReservationPage() {
  const router = useRouter()
  const [quotationData, setQuotationData] = useState({
    origin: 'Example Origin',
    destination: 'Example Destination',
    distance: 50
  })

  const handleReservation = (data: any) => {
    console.log('Reservation completed:', data)
    // You can perform any additional actions here if needed
  }

  const handleCancel = () => {
    router.push('/')
  }

  const handleReturnToHome = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ReservationForm
        quotationData={quotationData}
        onReservation={handleReservation}
        onCancel={handleCancel}
        onReturnToHome={handleReturnToHome}
      />
    </div>
  )
}