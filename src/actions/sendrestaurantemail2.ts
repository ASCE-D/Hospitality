"use server"

import { EmailTemplate2 } from '@/components/emailtemplate2';
import { prisma } from '@/utils/prismaDB';
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
const resend = new Resend(key);

export async function sendrestaurantemail2(restaurantId: string, reservationdetails: any, reservationId: any) {
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
      return { success: false, message: "Email notifications are disabled for this restaurant" };
    }

    // Generate accept and decline URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const acceptUrl = `${baseUrl}/api/reservations/${reservationId}/accept`;
    const declineUrl = `${baseUrl}/api/reservations/${reservationId}/decline`;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      // to: restaurant.owner.email,
      to: "deepeshgenani@gmail.com",
      subject: 'New Reservation Request',
      react: EmailTemplate2({ 
        firstName: restaurant.owner.name || 'Restaurant Owner', 
        reservationdetails, 
        reservationId,
        acceptUrl,
        declineUrl
      }),
    });

    console.log("Email sent");

    if (error) {
      console.error("Couldn't send email", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in sendrestaurantemail:", error);
    return { success: false, error: (error as Error).message };
  } 
}