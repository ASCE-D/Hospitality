"use server"
import { prisma } from '@/utils/prismaDB';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const client = twilio(accountSid, authToken);

export async function sendRestaurantWhatsapp2(restaurantId: string, reservationDetails: any, reservationId: any, reservationStatus: any) {
  console.log(reservationDetails);
  try {
    // Find the restaurant and its associated devices
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { 
        devices: true,
        owner: true
      },
    });

    if (!restaurant || restaurant.devices.length === 0) {
      throw new Error("Restaurant or devices not found");
    }

    // Check if whatsapp is true for the restaurant
    if (!restaurant.whatsapp) {
      console.log("WhatsApp notifications are disabled for this restaurant");
      return { success: false, message: "WhatsApp notifications are disabled for this restaurant" };
    }
    console.log("we are here ")

    // Generate accept and decline URLs
    const acceptUrl = `${baseUrl}/api/reservations/${reservationId}/accept`;
    const declineUrl = `${baseUrl}/api/reservations/${reservationId}/decline`;

    // Construct the message with accept and decline links
    const message = `
New Reservation at ${restaurant.name}!
Reservation ID: ${reservationId}
Date & Time: ${reservationDetails.dateTime}
Party Size: ${reservationDetails.partySize}
Customer: ${reservationDetails.firstName} ${reservationDetails.lastName}
Status: ${reservationStatus}
phoneNumber : ${reservationDetails.phoneNumber}

To accept this reservation, click here:
${acceptUrl}

To decline this reservation, click here:
${declineUrl}

Note: These links will only work if the reservation status is still pending.
    `;

    // Send WhatsApp message to all devices
    const sendPromises = restaurant.devices.map(device => 
      client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        // to: 'whatsapp:+919929840831' 
        to: `whatsapp:+${device.countryCode}${device.phoneNumber}`
      })
    );

    const results = await Promise.allSettled(sendPromises);

    // Process results
    const successfulSends = results.filter(result => result.status === 'fulfilled');
    const failedSends = results.filter(result => result.status === 'rejected');

    console.log(`WhatsApp messages sent to ${successfulSends.length} devices`);
    if (failedSends.length > 0) {
      console.error(`Failed to send messages to ${failedSends.length} devices`);
    }

    return { 
      success: true, 
      data: {
        successfulSends: successfulSends.length,
        failedSends: failedSends.length,
        totalDevices: restaurant.devices.length
      }
    };
  } catch (error) {
    console.error("Error in sendRestaurantWhatsapp:", error);
    return { success: false, error: (error as Error).message };
  } 
}