"use server";

import { EmailTemplate2 } from "@/components/emailtemplate2";
import { sendEmail } from "@/utils/email";
import { prisma } from "@/utils/prismaDB";
import { format } from "date-fns";
import { Resend } from "resend";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function sendRestaurantEmail3(
  restaurantId: string,
  reservationdetails: any,
  reservationId: any,
) {
  console.log(reservationdetails);
  try {
    // Find the restaurant and its owner's email
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { owner: true },
    });

    if (!restaurant || !restaurant.owner.email) {
      throw new Error("Restaurant or owner email not found");
    }

    // Check if mail is true for the restaurant
    if (!restaurant.mail) {
      console.log("Email notifications are disabled for this restaurant");
      return {
        success: false,
        message: "Email notifications are disabled for this restaurant",
      };
    }

    const foodReservation = await prisma.foodReservation.findUnique({
      where: { id: reservationId },
      include: {
        restaurant: {
          include: { devices: true }, // Include devices to get the restaurant's phone number
        },
      },
    });

    // Generate accept and decline URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const acceptUrl = `${baseUrl}api/reservations/${reservationId}/accept`;
    const declineUrl = `${baseUrl}api/reservations/${reservationId}/decline`;

    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   // to: restaurant.owner.email,
    //   to: "deepeshgenani@gmail.com",
    //   subject: "New Reservation Request",
    //   react: EmailTemplate2({
    //     firstName: restaurant.owner.name || "Restaurant Owner",
    //     reservationdetails,
    //     reservationId,
    //     acceptUrl,
    //     declineUrl,
    //   }),
    // });
    console.log(foodReservation?.dateTime);
    const data: EmailPayload = {
      to: `${restaurant.owner.email}`,
      subject: "New Reservation Request",
      html: `    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h2>Hello ${restaurant.owner.name},</h2>
      <p>You have received a new reservation request. Here are the details:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Name:</strong> ${reservationdetails.firstName}${" "}
          ${reservationdetails.lastName}
        </li>
        <li>
          <strong>Phone Number:</strong> ${reservationdetails.phoneNumber}
        </li>
        <li>
          <strong>Number of Seats: </strong> ${reservationdetails.seats}
        </li>
        <li>
          <strong>Date and Time:</strong> ${foodReservation?.dateTime.toUTCString().replace(/ GMT$/, "")}
        </li>
      </ul>
      <p>Please use the links below to accept or decline the reservation:</p>
      <div style=${{ margin: "80px 0" }}>
        <a
          href=${acceptUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Accept Reservation
        </a>
        <a
          href=${declineUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            textDecoration: "none",
          }}
        >
          Decline Reservation
        </a>
      </div>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Note: These links will only work if the reservation status is still
        pending. If you&apos;ve already taken action or the status has changed,
        please check your dashboard for the most up-to-date information.
      </p>
      <p>Thank you!</p>
    </div>`,
    };

    const response = await sendEmail(data);

    console.log("Email sent");

    return { success: true, data };
  } catch (error) {
    console.error("Error in sendrestaurantemail:", error);
    return { success: false, error: (error as Error).message };
  }
}
