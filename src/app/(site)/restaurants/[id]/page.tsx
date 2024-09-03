
import { PrismaClient } from "@prisma/client";
import ReservationForm from "@/components/ReservationForm";
import { NotificationProvider } from "@/context/NotificationContext";

const prisma = new PrismaClient();

async function getRestaurant(id: string) {
  return await prisma.restaurant.findUnique({
    where: { id },
  });
}

export default async function RestaurantDetail({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = await getRestaurant(params.id);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className=" my-24 mx-48">
      <h1 className="mb-4 text-2xl font-bold">{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>Address: {restaurant.address}</p>
      <NotificationProvider>
        {" "}
        <ReservationForm restaurantId={restaurant.id} />
      </NotificationProvider>
    </div>
  );
}
