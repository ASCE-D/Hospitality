import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import ReservationManagement from "@/components/ReservationManagement";
import { authOptions } from "@/utils/auth";

const prisma = new PrismaClient();

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
      reservations: {
        include: { user: true },
        orderBy: { dateTime: "asc" },
      },
    },
  });
  return restaurant?.reservations || [];
}

export default async function RestaurantDashboard() {
  const session = await getServerSession(authOptions);
  const restaurant = await getRestaurant(session?.user?.email as string);

  if (!session || !restaurant) {
    redirect("/login");
  }

  const reservations = await getRestaurantReservations(restaurant.ownerId);

  return (
    <div className=" m-32">
      <h1 className="mb-4 text-2xl font-bold">Restaurant Dashboard</h1>
      <ReservationManagement reservations={reservations} restaurantId={restaurant.id} />
    </div>
  );
}
