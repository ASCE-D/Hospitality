import { RestaurantList } from "@/components/Restaurant/Restaurants";
import { prisma } from "@/utils/prismaDB";
import Link from "next/link";


async function getRestaurants() {
  const result = await prisma.restaurant.findMany();
  console.log(result);
  return result;
}

export default async function Restaurants() {
  const restaurants = await getRestaurants();

  return <RestaurantList />;
}
