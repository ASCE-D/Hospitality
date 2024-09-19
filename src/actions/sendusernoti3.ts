"use server";

import { prisma } from "@/utils/prismaDB";
import { restaurants as r } from "@/utils/restaurants.json";
import { format } from "date-fns";

const whatsappServiceUrl = process.env.WHATSAPP_SERVICE_URL;

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

const formatDateForInput = (date: Date) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export async function sendUserNotification3(foodReservationId: string) {
  console.log("we are herrrrrrrreeeeeeee");
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

    // Create Google Maps link
    const googleMapsLink = r.find((r) => r.id === restaurant.id)?.location;

    // Get restaurant phone number (assuming it's the first device's number)
    const restaurantPhone = restaurant.devices[0]
      ? `${restaurant.devices[0].countryCode}${restaurant.devices[0].phoneNumber}`
      : "Not available";

    // Prepare the message based on the reservation status
    let message = "";
    if (status === "CONFIRMED") {
      message = `Great news! Your reservation at ${restaurant.name} has been confirmed for ${formatDateForInput(dateTime)}. Party size: ${seats}.
                 \nRestaurant Address: ${restaurant.address}\n
                 \nGoogle Maps: ${googleMapsLink}\n
                 \nRestaurant Phone: ${restaurantPhone}\n
                 \nWe look forward to seeing you!`;
    } else if (status === "REJECTED") {
      message = `We're sorry, but your reservation at ${restaurant.name} for ${dateTime.toLocaleString()} has been declined. Please contact the restaurant for more information or to make alternative arrangements.
                 Restaurant Phone: ${restaurantPhone}`;
    } else {
      message = `Your reservation at ${restaurant.name} is ${status.toLowerCase()} for ${dateTime.toLocaleString()}. Party size: ${seats}. We'll update you when the status changes.
                 Restaurant Address: ${restaurant.address}
                 Google Maps: ${googleMapsLink}
                 Restaurant Phone: ${restaurantPhone}`;
    }

    // Prepare phone numbers
    const phoneNumbers = [`${countryCode}${phoneNumber}`];
    console.log("haeeeeeeeeeeeeeeeeeeeee", phoneNumber);
    // Send the WhatsApp message
    const result = await sendWhatsAppMessage(phoneNumbers, message);
    console.log("yooooooooooooo", result);

    if (result.success) {
      console.log("WhatsApp message sent:", result.data);
      return { success: true, message: result.data };
    } else {
      console.error("Failed to send WhatsApp message:", result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
