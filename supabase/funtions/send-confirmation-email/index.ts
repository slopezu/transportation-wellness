import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const client = new SmtpClient()

serve(async (req) => {
  const { reservationData } = await req.json()

  await client.connectTLS({
    hostname: "smtp.example.com",
    port: 465,
    username: "your-username",
    password: "your-password",
  })

  await client.send({
    from: "noreply@yourdomain.com",
    to: reservationData.email,
    subject: "Reservation Confirmation",
    content: `
      Thank you for your reservation!
      
      Reservation Details:
      Reservation Code: ${reservationData.reservation_code}
      Name: ${reservationData.first_name} ${reservationData.last_name}
      Pickup Date: ${reservationData.pickup_date}
      Pickup Time: ${reservationData.pickup_time}
      Origin: ${reservationData.origin}
      Destination: ${reservationData.destination}
      Total Price: ₡${reservationData.price.toFixed(2)}
    `,
  })

  await client.close()

  return new Response(
    JSON.stringify({ message: "Email sent successfully" }),
    { headers: { "Content-Type": "application/json" } },
  )
})