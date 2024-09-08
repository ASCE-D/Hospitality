"use server"


import { prisma } from '@/utils/prismaDB'
import twilio from 'twilio'



export async function sendUserNotification(foodReservationId:string) {
    try {
        // Find the food reservation
        const foodReservation = await prisma.foodReservation.findUnique({
            where: { id: foodReservationId },
            include: { restaurant: true }
        })

        if (!foodReservation) {
            throw new Error('Food reservation not found')
        }

        const { phoneNumber, countryCode, restaurant, dateTime, seats ,status} = foodReservation

        if (!phoneNumber || !countryCode) {
            throw new Error('Phone number not available')
        }

        // Initialize Twilio client
        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const client = twilio(accountSid, authToken)

        // Prepare the message
        const message = `Your reservation at ${restaurant.name} is ${status}coming up on ${dateTime.toLocaleString()}. Party size: ${seats}`

        // Send the WhatsApp message
        const twilioMessage = await client.messages.create({
            body: message,
            from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
            // to: `whatsapp:+${countryCode}${phoneNumber}`
            to: 'whatsapp:+919929840831'
        })

        console.log('WhatsApp message sent:', twilioMessage.sid)
        return { success: true, messageSid: twilioMessage.sid }

    } catch (error:any) {
        console.error('Error sending WhatsApp message:', error)
        return { success: false, error: error.message }
    }
}