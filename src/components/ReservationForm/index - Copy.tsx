'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { format, isAfter, startOfDay, addDays } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

// Inicializa el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface QuotationData {
  origin: string;
  destination: string;
  distance: number;
  price: number;
}

interface ReservationFormProps {
  quotationData: QuotationData;
  onReservation: (data: any) => void;
  onCancel: () => void;
}

export default function ReservationForm({ quotationData, onReservation, onCancel }: ReservationFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm()
  const [reservationCode] = useState(
    Math.floor(10000000 + Math.random() * 90000000).toString()
  )
  const [totalPrice, setTotalPrice] = useState(quotationData.price)
  const [totalDistance, setTotalDistance] = useState(quotationData.distance)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isReservationComplete, setIsReservationComplete] = useState(false) // Asegúrate de que esta línea esté presente
  const [reservationEmail, setReservationEmail] = useState('')
  const router = useRouter()

  const isRoundTrip = watch('round_trip')
  const pickupDate = watch('pickup_date')

  React.useEffect(() => {
    if (isRoundTrip) {
      setTotalPrice(quotationData.price * 2)
      setTotalDistance(quotationData.distance * 2)
    } else {
      setTotalPrice(quotationData.price)
      setTotalDistance(quotationData.distance)
    }
  }, [isRoundTrip, quotationData.price, quotationData.distance])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    const reservationData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      additional_info: data.additional_info || '',
      baby_seat: data.baby_seat || false,
      wheelchair_accessible: data.wheelchair_accessible || false,
      round_trip: data.round_trip || false,
      pickup_date: format(new Date(data.pickup_date), 'yyyy-MM-dd'),
      pickup_time: format(new Date(data.pickup_time), 'HH:mm:ss'),
      return_date: data.return_date ? format(new Date(data.return_date), 'yyyy-MM-dd') : null,
      return_time: data.return_time ? format(new Date(data.return_time), 'HH:mm:ss') : null,
      reservation_code: reservationCode,
      origin: quotationData.origin,
      destination: quotationData.destination,
      distance: totalDistance,
      price: totalPrice,
      created_at: new Date().toISOString()
    }

    try {
      const { data: insertedData, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select()

      if (error) throw error

      if (!insertedData || insertedData.length === 0) {
        throw new Error('No data returned after insertion')
      }

      console.log('Reserva insertada:', insertedData[0])
      onReservation(insertedData[0])
      setReservationEmail(data.email)
      setIsReservationComplete(true)  // Asegúrate de que esta línea esté presente
    } catch (error) {
      console.error('Error al insertar la reserva:', error)
      alert(`Hubo un error al procesar su reserva: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReturnHome = () => {
    router.push('/')
  }

  if (isReservationComplete) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">¡Reserva Confirmada!</h2>
        <p className="text-lg mb-4 text-gray-700">
          Gracias por su reserva. Hemos enviado una confirmación a su correo electrónico: {reservationEmail}.
        </p>
        <p className="text-md mb-6 text-gray-600">
          Su código de reserva es: <span className="font-bold">{reservationCode}</span>
        </p>
        <button
          onClick={handleReturnHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver a la página de inicio
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Reservation <span className="text-sm font-normal text-gray-600">(Reservación)</span></h2>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <table className="w-full text-black">
          <tbody>
            {isRoundTrip ? (
              <>
                <tr>
                  <td colSpan={2} className="font-bold pb-2">Traslado 1:</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 pb-1">Origen:</td>
                  <td>{quotationData.origin}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 pb-1">Destino:</td>
                  <td>{quotationData.destination}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="font-bold pt-2 pb-2">Traslado 2:</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 pb-1">Origen:</td>
                  <td>{quotationData.destination}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 pb-1">Destino:</td>
                  <td>{quotationData.origin}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className="font-bold pr-4 pb-1">Origen:</td>
                  <td>{quotationData.origin}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 pb-1">Destino:</td>
                  <td>{quotationData.destination}</td>
                </tr>
              </>
            )}
            <tr>
              <td className="font-bold pr-4 pb-1">Distancia total:</td>
              <td>{totalDistance.toFixed(2)} km</td>
            </tr>
            <tr>
              <td className="font-bold pr-4 pb-1">Precio total:</td>
              <td>₡{totalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="font-bold pr-4">Código de Reserva:</td>
              <td>{reservationCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="round_trip"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div>
                <input
                  type="checkbox"
                  id="round_trip"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <label htmlFor="round_trip" className="text-black">Viaje de ida y vuelta</label>
        </div>
        <div>
          <label htmlFor="first_name" className="text-black">First Name <span className="text-sm text-gray-600">(Nombre)</span></label>
          <input
            id="first_name"
            type="text"
            className="text-black w-full border rounded-md p-2"
            {...register("first_name", { 
              required: "This field is required",
              minLength: { value: 2, message: "The first name must have at least 2 characters" }
            })}
          />
          {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name.message as string} / El nombre debe tener al menos 2 caracteres</span>}
        </div>
        <div>
          <label htmlFor="last_name" className="text-black">Last Name <span className="text-sm text-gray-600">(Apellido)</span></label>
          <input
            id="last_name"
            type="text"
            className="text-black w-full border rounded-md p-2"
            {...register("last_name", { 
              required: "This field is required",
              minLength: { value: 2, message: "The last name must have at least 2 characters" }
            })}
          />
          {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name.message as string} / El apellido debe tener al menos 2 caracteres</span>}
        </div>
        <div>
          <label htmlFor="email" className="text-black">Email <span className="text-sm text-gray-600">(Correo electrónico)</span></label>
          <input
            id="email"
            type="email"
            className="text-black w-full border rounded-md p-2"
            {...register("email", { 
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string} / Dirección de correo inválida</span>}
        </div>
        <div>
          <label htmlFor="phone" className="text-black">Phone <span className="text-sm text-gray-600">(Teléfono)</span></label>
          <input
            id="phone"
            type="tel"
            className="text-black w-full border rounded-md p-2"
            {...register("phone", { 
              required: "This field is required"
            })}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message as string} / Este campo es requerido</span>}
        </div>
        <div>
          <label htmlFor="pickup_date" className="text-black">Pickup Date <span className="text-sm text-gray-600">(Fecha de recogida)</span></label>
          <Controller
            control={control}
            name="pickup_date"
            rules={{ 
              required: "This field is required",
              validate: value => 
                isAfter(startOfDay(new Date(value)), addDays(startOfDay(new Date()), 1)) || 
                "The pickup date must be at least one day in the future"
            }}
            render={({ field }) => (
              <DatePicker
                id="pickup_date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="text-black w-full border rounded-md p-2"
                minDate={addDays(new Date(), 1)}
                dateFormat="dd/MM/yyyy"
                onFocus={(e) => e.target.readOnly = true}
                onBlur={(e) => e.target.readOnly = false}
                popperPlacement="bottom-start"
              />
            )}
          />
          {errors.pickup_date && <span className="text-red-500 text-sm">{errors.pickup_date.message as string} / La fecha de recogida debe ser al menos un día en el futuro</span>}
        </div>
        <div>
          <label htmlFor="pickup_time" className="text-black">Pickup Time <span className="text-sm text-gray-600">(Hora de recogida)</span></label>
          <Controller
            control={control}
            name="pickup_time"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <DatePicker
                id="pickup_time"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="text-black w-full border rounded-md p-2"
                onFocus={(e) => e.target.readOnly = true}
                onBlur={(e) => e.target.readOnly = false}
                popperPlacement="bottom-start"
              />
            )}
          />
          {errors.pickup_time && <span className="text-red-500 text-sm">{errors.pickup_time.message as string} / Este campo es requerido</span>}
        </div>
        {isRoundTrip && (
          <>
            <div>
              <label htmlFor="return_date" className="text-black">Return Date <span className="text-sm text-gray-600">(Fecha de regreso)</span></label>
              <Controller
                control={control}
                name="return_date"
                rules={{ 
                  required: "This field is required",
                  validate: value => 
                    isAfter(new Date(value), new Date(pickupDate)) || 
                    "The return  date must be after the pickup date"
                }}
                render={({ field }) => (
                  <DatePicker
                    id="return_date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    className="text-black w-full border rounded-md p-2"
                    minDate={addDays(new Date(pickupDate), 1)}
                    dateFormat="dd/MM/yyyy"
                    onFocus={(e) => e.target.readOnly = true}
                    onBlur={(e) => e.target.readOnly = false}
                    popperPlacement="bottom-start"
                  />
                )}
              />
              {errors.return_date && <span className="text-red-500 text-sm">{errors.return_date.message as string} / La fecha de regreso debe ser después de la fecha de recogida</span>}
            </div>
            <div>
              <label htmlFor="return_time" className="text-black">Return Time <span className="text-sm text-gray-600">(Hora de regreso)</span></label>
              <Controller
                control={control}
                name="return_time"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <DatePicker
                    id="return_time"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="text-black w-full border rounded-md p-2"
                    onFocus={(e) => e.target.readOnly = true}
                    onBlur={(e) => e.target.readOnly = false}
                    popperPlacement="bottom-start"
                  />
                )}
              />
              {errors.return_time && <span className="text-red-500 text-sm">{errors.return_time.message as string} / Este campo es requerido</span>}
            </div>
          </>
        )}
        <div>
          <label htmlFor="additional_info" className="text-black">Additional Information <span className="text-sm text-gray-600">(Información adicional)</span></label>
          <textarea
            id="additional_info"
            className="text-black w-full border rounded-md p-2"
            {...register("additional_info")}
            placeholder="Número de vuelo, requerimientos especiales, etc."
          />
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="baby_seat" {...register("baby_seat")} />
          <label htmlFor="baby_seat" className="text-black">I need a baby seat <span className="text-sm text-gray-600">(Necesito silla para bebé)</span></label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="wheelchair_accessible" {...register("wheelchair_accessible")} />
          <label htmlFor="wheelchair_accessible" className="text-black">I need wheelchair accessible transport <span className="text-sm text-gray-600">(Necesito transporte accesible para silla de ruedas)</span></label>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onCancel} className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded text-black">
            Cancel <span className="text-sm text-gray-600">(Cancelar)</span>
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Reserve'} <span className="text-sm">(Reservar)</span>
          </button>
        </div>
      </form>
    </div>
  )
}