"use server";

import { prisma } from "@/utils/prismaDB";
import twilio from "twilio";

export async function sendUserNotification2(foodReservationId: string) {
  try {
    // Find the food reservation
    const foodReservation = await prisma.foodReservation.findUnique({
      where: { id: foodReservationId },
      include: {
        restaurant: {
          include: { devices: true }, // Include devices to get the restaurant's phone number
        },
      },
    });

    if (!foodReservation) {
      throw new Error("Food reservation not found");
    }

    const { phoneNumber, countryCode, restaurant, dateTime, seats, status } =
      foodReservation;

    if (!phoneNumber || !countryCode) {
      throw new Error("Phone number not available");
    }

    // Initialize Twilio client
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // Create Google Maps link
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;

    // Get restaurant phone number (assuming it's the first device's number)
    const restaurantPhone = restaurant.devices[0]
      ? `${restaurant.devices[0].countryCode}${restaurant.devices[0].phoneNumber}`
      : "Not available";

        // Prepare the message based on the reservation status
        let message = ''
        if (status === 'CONFIRMED') {
            message = 
            
            
            `
            
            
          Great news! Your reservation at ${restaurant.name} has been confirmed for ${dateTime.toLocaleString()}. Party size: ${seats}.

          Restaurant Address: ${restaurant.address}
          Google Maps: ${googleMapsLink}
          Restaurant Phone: ${restaurantPhone}

          We look forward to seeing you!`
        } else if (status === 'REJECTED') {
            message = `We're sorry, but your reservation at ${restaurant.name} for ${dateTime.toLocaleString()} has been declined. Please contact the restaurant for more information or to make alternative arrangements.

Restaurant Phone: ${restaurantPhone}`;
    } else {
      message = `Your reservation at ${restaurant.name} is ${status.toLowerCase()} for ${dateTime.toLocaleString()}. Party size: ${seats}. We'll update you when the status changes.

Restaurant Address: ${restaurant.address}
Google Maps: ${googleMapsLink}
Restaurant Phone: ${restaurantPhone}

`
        }

        // Send the WhatsApp message
        const twilioMessage = await client.messages.create({
            body: message,
            from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
            //  to: `whatsapp:+${countryCode}${phoneNumber}`
           to: 'whatsapp:+919929840831'
        // to: 'whatsapp:+393483768922'
        })

    console.log("WhatsApp message sent:", twilioMessage.sid);
    return { success: true, messageSid: twilioMessage.sid };
  } catch (error: any) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, error: error.message };
  }
}
