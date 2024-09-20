import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ReservationManagement from "@/components/ReservationManagement";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";


async function getRestaurant(email: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { owner: { email } },
  });

  return restaurant;
}

async function getRestaurantReservations(ownerId: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { ownerId },
    include: {
      // reservations: {
      //   include: { user: true },
      //   orderBy: { dateTime: "asc" },
      // },
      foodReservation:{
        include: { user: true },
        orderBy: {dateTime:"asc"}
      }
    },
  });
  return restaurant?.foodReservation || [];
}

export default async function RestaurantDashboard() {
  const session = await getServerSession(authOptions);
  const restaurant = await getRestaurant(session?.user?.email as string);

  if (!session || !restaurant) {
    redirect("/signin");
  }

  const reservations = await getRestaurantReservations(restaurant.ownerId);

  return (
    <div className="mt-2">
      <ReservationManagement reservations={reservations} restaurantId={restaurant.id} />
    </div>
  );
}
