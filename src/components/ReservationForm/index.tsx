'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { format, isAfter, startOfDay, addDays, isValid } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Calendar, Clock, CheckCircle, ArrowRight, ArrowLeft, DollarSign, User, Mail, Phone, Bus } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface QuotationData {
  origin: string;
  destination: string;
  distance: number;
}

interface ReservationFormProps {
  quotationData: QuotationData;
  onReservation: (data: any) => void;
  onCancel: () => void;
  onReturnToHome: () => void;
}

const steps = ['Personal Info', 'Trip Details', 'Confirmation', 'Payment Information']

export default function ReservationForm({ quotationData, onReservation, onCancel, onReturnToHome }: ReservationFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm()
  const [reservationCode] = useState(
    Math.floor(10000000 + Math.random() * 90000000).toString()
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [reservationData, setReservationData] = useState<any>(null)
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const isRoundTrip = watch('round_trip')

  useEffect(() => {
    console.log('Current step:', currentStep)
    console.log('Is reservation confirmed:', isReservationConfirmed)
  }, [currentStep, isReservationConfirmed])

  const calculatePrice = (distance: number): number => {
    let basePrice = 0;
    if (distance <= 10) {
      return 0; // No service available
    } else if (distance <= 19) {
      basePrice = distance * 3;
    } else if (distance <= 23) {
      basePrice = distance * 2.5;
    } else if (distance <= 30) {
      basePrice = distance * 2.2;
    } else if (distance <= 40) {
      basePrice = distance * 2.3;
    } else if (distance <= 70) {
      basePrice = distance * 1.7;
    } else if (distance <= 99) {
      basePrice = distance * 1.6;
    } else if (distance <= 120) {
      basePrice = distance * 1.4;
    } else {
      basePrice = distance * 1.1;
    }

    // Apply the final formula: price + 13% + 25 + 4%
    const priceWith13Percent = basePrice * 1.13;
    const priceWith25Added = priceWith13Percent + 25;
    const finalPrice = priceWith25Added * 1.04;

    return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
  }

  useEffect(() => {
    const price = calculatePrice(quotationData.distance);
    setTotalPrice(isRoundTrip ? price * 2 : price);
  }, [isRoundTrip, quotationData.distance])

  const formatDate = (date: Date | null): string | null => {
    if (!date || !isValid(date)) return null;
    return format(date, 'yyyy-MM-dd');
  }

  const formatTime = (date: Date | null): string | null => {
    if (!date || !isValid(date)) return null;
    return format(date, 'HH:mm:ss');
  }

const sendConfirmationEmail = async (reservationData: any) => {
  try {
    const response = await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

  const saveReservationToSupabase = async (reservationData: any) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select()

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving reservation to Supabase:', error);
      throw error;
    }
  };

  const onSubmit = async (data: any) => {
    console.log('Form submitted, current step:', currentStep);
    if (currentStep === 0) {
      console.log('Moving to Trip Details');
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setIsSubmitting(true)
      const newReservationData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        additional_info: data.additional_info || '',
        baby_seat: data.baby_seat || false,
        wheelchair_accessible: data.wheelchair_accessible || false,
        round_trip: data.round_trip || false,
        pickup_date: formatDate(data.pickup_date),
        pickup_time: formatTime(data.pickup_time),
        return_date: data.return_date ? formatDate(data.return_date) : null,
        return_time: data.return_time ? formatTime(data.return_time) : null,
        reservation_code: reservationCode,
        origin: quotationData.origin,
        destination: quotationData.destination,
        distance: quotationData.distance,
        price: totalPrice,
        created_at: new Date().toISOString()
      }

      setReservationData(newReservationData)
      console.log('Moving to Confirmation');
      setCurrentStep(2) // Move to confirmation step
      setIsSubmitting(false)
    }
  }

  const handlePayment = () => {
    console.log('Moving to Payment Information step');
    setCurrentStep(3);
  }

  const handleFinalizeReservation = async () => {
    setIsSubmitting(true)
    try {
      console.log('Starting finalization process...');
      
      // Save reservation to Supabase
      const savedData = await saveReservationToSupabase(reservationData);
      console.log('Reservation saved to Supabase:', savedData);
      
      // Send confirmation email
      const emailResult = await sendConfirmationEmail(reservationData);
      console.log('Confirmation email sent:', emailResult);
      
      console.log('Reservation confirmed:', reservationData)
      onReservation(reservationData)
      
      // Set reservation as confirmed
      setIsReservationConfirmed(true)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error finalizing reservation:', error)
      setShowConfirmation(true) // Show error message
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    console.log('Rendering step:', currentStep)
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="text-xl font-bold mb-4 text-black">Personal Information</h3>
            <div className="bg-green-100 p-4 rounded-lg mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-black">Total Price:</span>
              <span className="text-2xl font-bold flex items-center text-black">
                <DollarSign className="mr-1 text-black" />
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-black mb-4">Please fill out the following information to continue with your reservation:</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="first_name" className="text-black">First Name <span className="text-sm text-gray-600">(Nombre)</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                  <input
                    id="first_name"
                    type="text"
                    className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                    {...register("first_name", { 
                      required: "This field is required",
                      minLength: { value: 2, message: "The first name must have at least 2 characters" }
                    })}
                  />
                </div>
                {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name.message as string} / El nombre debe tener al menos 2 caracteres</span>}
              </div>
              <div>
                <label htmlFor="last_name" className="text-black">Last Name <span className="text-sm text-gray-600">(Apellido)</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                  <input
                    id="last_name"
                    type="text"
                    className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                    {...register("last_name", { 
                      required: "This field is required",
                      minLength: { value: 2, message: "The last name must have at least 2 characters" }
                    })}
                  />
                </div>
                {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name.message as string} / El apellido debe tener al menos 2 caracteres</span>}
              </div>
              <div>
                <label htmlFor="email" className="text-black">Email <span className="text-sm text-gray-600">(Correo electrónico)</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                  <input
                    id="email"
                    type="email"
                    className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                    {...register("email", { 
                      required: "This field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string} / Dirección de correo inválida</span>}
              </div>
              <div>
                <label htmlFor="phone" className="text-black">Phone <span className="text-sm text-gray-600">(Teléfono)</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                  <input
                    id="phone"
                    type="tel"
                    className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                    {...register("phone", { 
                      required: "This field is required"
                    })}
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message as string} / Este campo es requerido</span>}
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="text-xl font-bold mb-4 text-black">Trip Details</h3>
            <div className="space-y-4">
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
                        className="form-checkbox h-5 w-5 text-green-600"
                      />
                    </div>
                  )}
                />
                <label htmlFor="round_trip" className="text-black">Round Trip <span className="text-sm text-gray-600">(Viaje de ida y vuelta)</span></label>
              </div>
              <div>
                <label htmlFor="pickup_date" className="text-black">Pickup Date <span className="text-sm text-gray-600">(Fecha de recogida)</span></label>
                <div className="relative">
                  <Controller
                    control={control}
                    name="pickup_date"
                    rules={{ 
                      required: "This field is required",
                      validate: value => {
                        const today = startOfDay(new Date());
                        const selectedDate = startOfDay(new Date(value));
                        return isAfter(selectedDate, addDays(today, 1)) || 
                          "The pickup date must be at least two days from now";
                      }
                    }}
                    render={({ field  }) => (
                      <DatePicker
                        id="pickup_date"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                        minDate={addDays(new Date(), 2)}
                        dateFormat="dd/MM/yyyy"
                        onFocus={(e) => e.target.readOnly = true}
                        onBlur={(e) => e.target.readOnly = false}
                        popperPlacement="bottom-start"
                      />
                    )}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                </div>
                {errors.pickup_date && <span className="text-red-500 text-sm">{errors.pickup_date.message as string} / La fecha de recogida debe ser al menos dos días a partir de hoy</span>}
              </div>
              <div>
                <label htmlFor="pickup_time" className="text-black">Pickup Time <span className="text-sm text-gray-600">(Hora de recogida)</span></label>
                <div className="relative">
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
                        className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                        onFocus={(e) => e.target.readOnly = true}
                        onBlur={(e) => e.target.readOnly = false}
                        popperPlacement="bottom-start"
                      />
                    )}
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                </div>
                {errors.pickup_time && <span className="text-red-500 text-sm">{errors.pickup_time.message as string} / Este campo es requerido</span>}
              </div>
              {isRoundTrip && (
                <>
                  <div>
                    <label htmlFor="return_date" className="text-black">Return Date <span className="text-sm text-gray-600">(Fecha de regreso)</span></label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="return_date"
                        rules={{ 
                          required: "This field is required",
                          validate: value => 
                            isAfter(new Date(value), new Date(watch('pickup_date'))) || 
                            "The return date must be after the pickup date"
                        }}
                        render={({ field }) => (
                          <DatePicker
                            id="return_date"
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                            className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                            minDate={addDays(new Date(watch('pickup_date')), 1)}
                            dateFormat="dd/MM/yyyy"
                            onFocus={(e) => e.target.readOnly = true}
                            onBlur={(e) => e.target.readOnly = false}
                            popperPlacement="bottom-start"
                          />
                        )}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                    </div>
                    {errors.return_date && <span className="text-red-500 text-sm">{errors.return_date.message as string} / La fecha de regreso debe ser después de la fecha de recogida</span>}
                  </div>
                  <div>
                    <label htmlFor="return_time" className="text-black">Return Time <span className="text-sm text-gray-600">(Hora de regreso)</span></label>
                    <div className="relative">
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
                            className="text-black w-full border border-green-300 rounded-md p-2 pl-10 focus:ring-green-500 focus:border-green-500"
                            onFocus={(e) => e.target.readOnly = true}
                            onBlur={(e) => e.target.readOnly = false}
                            popperPlacement="bottom-start"
                          />
                        )}
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" size={20} />
                    </div>
                    {errors.return_time && <span className="text-red-500 text-sm">{errors.return_time.message as string} / Este campo es requerido</span>}
                  </div>
                </>
              )}
              <div>
                <label htmlFor="additional_info" className="text-black">Additional Information <span className="text-sm text-gray-600">(Información adicional)</span></label>
                <textarea
                  id="additional_info"
                  className="text-black w-full border border-green-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                  {...register("additional_info")}
                  placeholder="Flight number, special requirements, etc."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="baby_seat" {...register("baby_seat")} className="form-checkbox h-5 w-5 text-green-600" />
                <label htmlFor="baby_seat" className="text-black">I need a baby seat <span className="text-sm text-gray-600">(Necesito silla para bebé)</span></label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="wheelchair_accessible" {...register("wheelchair_accessible")} className="form-checkbox h-5 w-5 text-green-600" />
                <label htmlFor="wheelchair_accessible" className="text-black">I need wheelchair accessible transport <span className="text-sm text-gray-600">(Necesito transporte accesible para silla de ruedas)</span></label>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="text-xl font-bold mb-4 text-black">Confirm Reservation</h3>
            <div className="bg-green-50 p-4 rounded mb-4">
              <table className="w-full text-black">
                <tbody>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Reservation Code:</td>
                    <td>{reservationData.reservation_code}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Name:</td>
                    <td>{reservationData.first_name} {reservationData.last_name}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Email:</td>
                    <td>{reservationData.email}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Phone:</td>
                    <td>{reservationData.phone}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Origin:</td>
                    <td>{reservationData.origin}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Destination:</td>
                    <td>{reservationData.destination}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Pickup Date:</td>
                    <td>{reservationData.pickup_date}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-4 pb-1">Pickup Time:</td>
                    <td>{reservationData.pickup_time}</td>
                  </tr>
                  {reservationData.round_trip && (
                    <>
                      <tr>
                        <td className="font-bold pr-4 pb-1">Return Date:</td>
                        <td>{reservationData.return_date}</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-4 pb-1">Return Time:</td>
                        <td>{reservationData.return_time}</td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className="font-bold pr-4 pb-1">Total Price:</td>
                    <td className="text-xl font-bold">${reservationData.price.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button 
              onClick={handlePayment} 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Payment
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-black">Payment Information</h3>
            <div className="bg-green-200 border border-green-300 rounded-lg p-4 mb-4">
              <p className="text-black mb-2">
                To complete your booking, please follow these steps:
              </p>
              <ol className="list-decimal list-inside text-black mb-4">
                <li>You will receive an email with a payment link within the next 24 hours.</li>
                <li>Click on the link in the email to proceed with the payment.</li>
              </ol>
              <p className="text-black font-bold">
                Important: Your reservation is not confirmed until the payment is completed.
              </p>
            </div>
            <div className="bg-blue-200 border border-blue-300 rounded-lg p-4 mb-4">
              <h4 className="text-xl font-bold text-black mb-2">Thank You</h4>
              <p className="text-black mb-2">
                After finalizing, a confirmation email will be sent to your email address with all the details of your reservation.
              </p>
              <p className="text-black font-bold">
                We look forward to providing you with excellent transportation service!
              </p>
            </div>
            <button 
              onClick={handleFinalizeReservation}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Finalize Reservation'}
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-8 bg-green-100 p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
          <Bus className="mr-2 text-green-600" /> Shuttle Reservation Process
        </h2>
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-green-500 text-white' : 'bg-green-200 text-green-600'}`}>
                {index < currentStep ? <CheckCircle size={20} /> : index + 1}
              </div>
              <span className="text-xs mt-1 text-black">{step}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-green-200 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
      {currentStep < 2 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center px-4 py-2 bg-green-100 text-black rounded hover:bg-green-200 transition duration-300"
              >
                <ArrowLeft size={16} className="mr-2" /> Previous
              </button>
            )}
            {currentStep === 0 && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? (isSubmitting ? 'Submitting...' : 'Review') : 'Next'}
              {currentStep < 1 && <ArrowRight size={16} className="ml-2" />}
            </button>
          </div>
        </form>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bol d mb-4 text-green-600">Reservation Confirmed</h3>
            <p className="text-black mb-4">
              Your reservation has been finalized successfully! You will receive a confirmation email shortly.
            </p>
            <button
              onClick={() => {
                setShowConfirmation(false);
                onReturnToHome();
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  )
}