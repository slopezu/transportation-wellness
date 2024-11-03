import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configurar el transporter de Nodemailer con Zoho
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: 'reservations@transportation-wellness.com',
    pass: process.env.ZOHO_PASSWORD // Asegúrate de configurar esta variable de entorno
  }
})

export async function POST(req: Request) {
  const reservationData = await req.json()

  const emailContent = `
    <h1>Reservation Confirmation</h1>
    <p>Dear ${reservationData.first_name} ${reservationData.last_name},</p>
    <p>Thank you for choosing Wellness Transportation. Your reservation has been confirmed with the following details:</p>
    <ul>
      <li>Reservation Code: ${reservationData.reservation_code}</li>
      <li>Pickup Date: ${reservationData.pickup_date}</li>
      <li>Pickup Time: ${reservationData.pickup_time}</li>
      <li>Origin: ${reservationData.origin}</li>
      <li>Destination: ${reservationData.destination}</li>
      ${reservationData.round_trip ? `
        <li>Return Date: ${reservationData.return_date}</li>
        <li>Return Time: ${reservationData.return_time}</li>
      ` : ''}
      <li>Total Price: $${reservationData.price.toFixed(2)}</li>
    </ul>
    <p><strong>You will receive a payment link shortly to complete your reservation.</strong></p>
    <p>If you need to make any changes to your reservation, please contact us as soon as possible.</p>
    <p>Best regards,<br>Wellness Transportation Team</p>
  `

  try {
    await transporter.sendMail({
      from: '"Wellness Transportation" <reservations@transportation-wellness.com>',
      to: reservationData.email,
      cc: 'reservations@transportation-wellness.com',
      bcc: 'lopesteven@gmail.com', // Agregamos esta dirección como BCC
      subject: 'Reservation Confirmation - Wellness Transportation',
      html: emailContent,
    })

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}