import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import ReservationManagement from "@/components/ReservationManagement";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";

async function getRestaurant(email: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { owner: { email } },
  });
  return restaurant;
}

async function getSpecificFoodReservation(reservationId: string) {
  const foodReservation = await prisma.foodReservation.findUnique({
    where: {
      id: reservationId,
    },
    include: {
      user: true,
      restaurant: true,
    },
  });
  return foodReservation;
}

export default async function SpecificReservationPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  const restaurant = await getRestaurant(session.user?.email as string);
  if (!restaurant) {
    redirect("/dashboard");
  }

  const reservation = await getSpecificFoodReservation(params.id);
  if (!reservation || reservation.restaurantId !== restaurant.id) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className="">Food Reservation Details</h1>
      <ReservationManagement reservations={[reservation]} restaurantId={restaurant.id} />
    </div>
  );
}