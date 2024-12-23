"use server";
import { prisma } from "@/utils/prismaDB";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const client = twilio(accountSid, authToken);

export async function sendRestaurantWhatsapp2(
  restaurantId: string,
  reservationDetails: any,
  reservationId: any,
  reservationStatus: any,
) {
  console.log(reservationDetails);
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
    console.log("we are here ");

    // Generate accept and decline URLs
    const acceptUrl = `https://hospitality-liart.vercel.app/api/reservations/${reservationId}/accept`;
    const declineUrl = `https://hospitality-liart.vercel.app/api/reservations/${reservationId}/decline`;

    // Construct the message with accept and decline links
    const message = `
New Reservation at ${restaurant.name}!
Reservation ID: ${reservationId}
Date & Time: ${reservationDetails.dateTime}
Party Size: ${reservationDetails.seats}
Customer: ${reservationDetails.firstName} ${reservationDetails.lastName}
Status: ${reservationStatus}
phoneNumber : ${reservationDetails.phoneNumber}

To accept this reservation, click here:
${acceptUrl}

To decline this reservation, click here:
${declineUrl}

Note: These links will only work if the reservation status is still pending.
    `;

    const dateObj = new Date(reservationDetails.dateTime);
    const dateTimeString = dateObj.toUTCString().slice(0, 22);

    console.log(dateTimeString);

    console.log(
      "variables",
      JSON.stringify({
        1: `${restaurant.name}`,
        2: `${reservationId}`,
        3: `${dateTimeString}`,
        4: `${reservationDetails.seats}`,
        5: `${reservationDetails.firstName} `,
        6: `${reservationDetails.lastName}`,
        7: `${reservationStatus}`,
        8: `${reservationDetails.phoneNumber}`,
        9: `${acceptUrl}`,
        10: `${declineUrl}`,
      }),
    );

    const wp = await client.messages.create({
      contentSid: "HX93e808e4602595c1241403414d5e6147", // Replace with your Content SID
      contentVariables: JSON.stringify({
        "restaurant.name": `${restaurant.name}`,
        reservationId: `${reservationId}`,
        "reservationDetails.dateTime": `${dateTimeString}`,
        "reservationDetails.partySize": `${reservationDetails.seats}`,
        "reservationDetails.firstName": `${reservationDetails.firstName}`,
        "reservationDetails.lastName": `${reservationDetails.lastName}`,
        reservationStatus: `${reservationStatus}`,
        "reservationDetails.phoneNumber": `${reservationDetails.phoneNumber}`,
        acceptUrl: `${acceptUrl}`,
        declineUrl: `${declineUrl}`,
      }),
      from: "whatsapp:+393759132750", // Replace with your Twilio WhatsApp-enabled number
      messagingServiceSid: "MG46d3a64f5ddca12596bd7486e93f1027", // Replace with your Messaging Service SID
      to: `whatsapp:${91}${7869947476}`, // Replace with the recipient's number
    });
    console.log("message", wp);
    // Send WhatsApp message to all devices
    const sendPromises = restaurant.devices.map(async (device) => {
      console.log("69");
      const wp = await client.messages.create({
        contentSid: "HX93e808e4602595c1241403414d5e6147", // Replace with your Content SID
        contentVariables: JSON.stringify({
          1: `${restaurant.name}`,
          2: `${reservationId}`,
          3: `${reservationDetails.dateTime.toUTCString().slice(0, 22)}`,
          4: `${reservationDetails.seats}`,
          5: `${reservationDetails.firstName} ${reservationDetails.lastName}`,
          6: `${reservationStatus}`,
          7: `${reservationDetails.phoneNumber}`,
          8: `${acceptUrl}`,
          9: `${declineUrl}`,
        }),
        from: "whatsapp:+393759132750", // Replace with your Twilio WhatsApp-enabled number
        messagingServiceSid: "MG46d3a64f5ddca12596bd7486e93f1027", // Replace with your Messaging Service SID
        to: `whatsapp:${device.countryCode}${device.phoneNumber}`, // Replace with the recipient's number
      });

      console.log("message", wp);
    });

    const results = await Promise.allSettled(sendPromises);

    // Process results
    const successfulSends = results.filter(
      (result) => result.status === "fulfilled",
    );
    const failedSends = results.filter(
      (result) => result.status === "rejected",
    );

    console.log(`WhatsApp messages sent to ${successfulSends.length} devices`);
    if (failedSends.length > 0) {
      console.error(`Failed to send messages to ${failedSends.length} devices`);
    }

    return {
      success: true,
      data: {
        successfulSends: successfulSends.length,
        failedSends: failedSends.length,
        totalDevices: restaurant.devices.length,
      },
    };
  } catch (error) {
    console.error("Error in sendRestaurantWhatsapp:", error);
    return { success: false, error: (error as Error).message };
  }
}
