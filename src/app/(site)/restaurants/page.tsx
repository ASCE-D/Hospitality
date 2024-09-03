import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getRestaurants() {
  const result = await prisma.restaurant.findMany();
  console.log(result);
  return result
}

export default async function Restaurants() {
  const restaurants = await getRestaurants();

  return (
    <div className="py-48">
      <h1 className="mb-4 text-2xl font-bold">Restaurants</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="rounded border p-4 shadow">
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
