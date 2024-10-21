import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ReservationManagement from "@/components/ReservationManagement";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";
import DeliveryDashboardContent from "@/components/ddashboard";

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
      include: { restaurant: true },
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
async function getDeliveryOrders(restaurantId: string) {
  const deliveryOrders = await prisma.deliveryOrder.findMany({
    where: { restaurantId },
    include: {
      orderItems: {
        include: { menuItem: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return deliveryOrders;
}

export default async function RestaurantDashboard() {
  const session = await getServerSession(authOptions);
  const restaurant = await getRestaurant(session?.user?.email as string);

  if (!session || !restaurant) {
    redirect("/signin");
  }

  const reservations = await getRestaurantReservations(restaurant.ownerId);
  const deliveryOrders = await getDeliveryOrders(restaurant.id);
  return (
    <div className="mt-2">
      <ReservationManagement
        reservations={reservations}
        restaurantId={restaurant.id}
      />
       <DeliveryDashboardContent
       //@ts-ignore
            initialOrders={deliveryOrders}
            restaurantId={restaurant.id}
          />
    </div>
  );
}
