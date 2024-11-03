'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export async function createReservation(formData: FormData) {
  const reservationData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    additional_info: formData.get('additional_info') || '',
    baby_seat: formData.get('baby_seat') === 'on',
    wheelchair_accessible: formData.get('wheelchair_accessible') === 'on',
    round_trip: formData.get('round_trip') === 'on',
    pickup_date: formData.get('pickup_date'),
    pickup_time: formData.get('pickup_time'),
    return_date: formData.get('return_date'),
    return_time: formData.get('return_time'),
    reservation_code: formData.get('reservation_code'),
    origin: formData.get('origin'),
    destination: formData.get('destination'),
    distance: parseFloat(formData.get('distance') as string),
    price: parseFloat(formData.get('price') as string),
    created_at: new Date().toISOString()
  }

  try {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservationData])
      .select()

    if (error) throw error

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error al insertar la reserva:', error)
    return { success: false, error: error.message }
  }
}