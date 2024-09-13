import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { sendUserNotification2 } from "@/actions/sendusernoti2";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // First, fetch the current reservation
    const currentReservation = await prisma.foodReservation.findUnique({
      where: { id },
    });

    // Check if the reservation exists and its status is PENDING
    if (!currentReservation) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=Reservation not found`);
    }

    if (currentReservation.status !== "PENDING") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=Reservation is no longer pending`);
    }

    // If the status is PENDING, update it to REJECTED
    const updatedReservation = await prisma.foodReservation.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    // Send notification to the user
    await sendUserNotification2(id);

    // Redirect to a confirmation page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-declined`);
  } catch (error) {
    console.error("Error declining reservation:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=An unexpected error occurred`);
  }
}