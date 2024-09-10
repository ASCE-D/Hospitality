"use server";

import { sendEmail } from "@/utils/email";
import { prisma } from "@/utils/prismaDB";
import { revalidatePath } from "next/cache";

export async function createFoodReservation(reservationdetails: any) {
  console.log(reservationdetails);
  const {
    firstName,
    lastName,
    seats,
    phoneNumber,
    countryCode,
    restaurantId,
    dateTime,
    userId,
  } = reservationdetails;

  try {
    // Create new reservation
    const newReservation = await prisma.foodReservation.create({
      data: {
        firstName,
        lastName,
        seats,
        phoneNumber,
        countryCode,
        restaurantId,
        dateTime,
        userId,
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/reservations");

    return { success: true, reservation: newReservation };
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return { success: false, error: "Failed to create reservation" };
  }
}
