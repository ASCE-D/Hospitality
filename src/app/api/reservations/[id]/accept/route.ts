import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { sendUserNotification2 } from "@/actions/sendusernoti2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized or insufficient permissions" }, { status: 401 });
  }

  const userEmail = session.user.email;
  try {
    const currentReservation = await prisma.foodReservation.findUnique({
      where: { id },
      include: { restaurant: true },
    });

    if (!currentReservation) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=Reservation not found`);
    }

    if (currentReservation.status !== "PENDING") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=Reservation is no longer pending`);
    }

    const updatedReservation = await prisma.foodReservation.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    await sendUserNotification2(id);

    const reservationDetails = encodeURIComponent(JSON.stringify({
      id: updatedReservation.id,
      dateTime: updatedReservation.dateTime.toISOString(),
      seats: updatedReservation.seats,
      firstName: updatedReservation.firstName,
      lastName: updatedReservation.lastName,
      status: updatedReservation.status,
      phoneNumber: updatedReservation.phoneNumber,
      restaurantName: currentReservation.restaurant.name,
      restaurantAddress: currentReservation.restaurant.address,
    }));

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/status?status=true&details=${reservationDetails}`);
  } catch (error) {
    console.error("Error accepting reservation:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?message=An unexpected error occurred`);
  }
}