"use server"
import { EmailTemplate } from '@/components/emailtemplate';
import { prisma } from '@/utils/prismaDB';
import { Resend } from 'resend';

const key = process.env.RESEND_API_KEY;
const resend = new Resend(key);

export async function sendrestaurantemail(restaurantId: string, reservationdetails:any) {
  try {
    // Find the restaurant and its owner's email
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { owner: true },
    });

    if (!restaurant || !restaurant.owner.email) {
      throw new Error("Restaurant or owner email not found");
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [restaurant.owner.email],
      subject: 'Restaurant Notification',
      react: EmailTemplate({ firstName: restaurant.owner.name || 'Restaurant Owner' , reservationdetails}),
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