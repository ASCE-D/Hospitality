"use server";

import { prisma } from "@/utils/prismaDB";
import { format } from "date-fns";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const whatsappServiceUrl = process.env.WHATSAPP_SERVICE_URL;

const formatDateForInput = (date: Date) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd'T'HH:mm");
};


async function sendWhatsAppMessage(phoneNumbers: string[], message: string) {
  try {
    const response = await fetch(
      `https://whatsapp-8xre.onrender.com/send-whatsapp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumbers, message }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendRestaurantWhatsapp3(
  restaurantId: string,
  reservationDetails: any,
  reservationId: any,
  reservationStatus: any,
) {
  console.log("Reservation details:", reservationDetails);

  try {
    // Find the restaurant and its associated devices
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        devices: true,
        owner: true,
      },
    });

    if (!restaurant || restaurant.devices.length === 0) {
      throw new Error("Restaurant or devices not found");
    }

    // Check if whatsapp is true for the restaurant
    if (!restaurant.whatsapp) {
      console.log("WhatsApp notifications are disabled for this restaurant");
      return {
        success: false,
        message: "WhatsApp notifications are disabled for this restaurant",
      };
    }

    console.log("Preparing to send WhatsApp message");

    // Generate accept and decline URLs
    const acceptUrl = `https://hospitality-liart.vercel.app/api/reservations/${reservationId}/accept`;
    const declineUrl = `https://hospitality-liart.vercel.app/api/reservations/${reservationId}/decline`;

    // Construct the message with accept and decline links
    const message = `
New Reservation at ${restaurant.name}!
Reservation ID: ${reservationId}
Date & Time: ${reservationDetails.dateTime.toLocaleString()}
Party Size: ${reservationDetails.seats}
Customer: ${reservationDetails.firstName} ${reservationDetails.lastName}
Status: ${reservationStatus}
Phone Number:${reservationDetails.countryCode} ${reservationDetails.phoneNumber}

To accept this reservation, click here:
${acceptUrl}

To decline this reservation, click here:
${declineUrl}

Note: These links will only work if the reservation status is still pending.
    `;

    // Prepare phone numbers
    const phoneNumbers = restaurant.devices.map(
      (device) => `${device.countryCode}${device.phoneNumber}`,
    );

    // Send WhatsApp message
    const result = await sendWhatsAppMessage(phoneNumbers, message);

    if (result.success) {
      console.log(`WhatsApp messages sent successfully. Result:`, result.data);
      return {
        success: true,
        data: result.data,
      };
    } else {
      console.error("Failed to send WhatsApp messages:", result.error);
      return {
        success: false,
        error: result.error,
      };
    }
  } catch (error) {
    console.error("Error in sendRestaurantWhatsapp2:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
