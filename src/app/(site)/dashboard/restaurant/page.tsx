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
  if (ownerId == "cm145fyev000511uyt6a2qo2s") {
    const foodReservation = await prisma.foodReservation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return foodReservation;
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { ownerId },
    include: {
      // reservations: {
      //   include: { user: true },
      //   orderBy: { dateTime: "asc" },
      // },
      foodReservation: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return restaurant?.foodReservation || [];
}

export async function searchReservations(formData: FormData) {
  const searchQuery = formData.get("query") as string;

  if (!searchQuery) {
    return [];
  }

  const reservations = await prisma.foodReservation.findMany({
    where: {
      OR: [
        { firstName: { contains: searchQuery, mode: "insensitive" } },
        { lastName: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      // Add other fields you want to return
    },
  });

  return reservations;
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
      <ReservationManagement
        reservations={reservations}
        restaurantId={restaurant.id}
      />
    </div>
  );
}
