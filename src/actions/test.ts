import { prisma } from "@/utils/prismaDB";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function updateRestaurantHours(data: any) {
  const defaultTime = {
    open: "09:00",
    close: "17:00",
  };

  for (const restaurant of data.restaurants) {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    // Create new hours
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      let openTime = restaurant[day]?.open || defaultTime.open;
      let closeTime = restaurant[day]?.close || defaultTime.close;

      // Check if there's a closing note
      if (restaurant.notes?.toLowerCase().includes("closed")) {
        closeTime = openTime; // Set close time same as open time to indicate it's closed
      }

      await prisma.restaurantHours.create({
        data: {
          dayOfWeek: i,
          openTime: new Date(`2023-01-01T${openTime}:00`),
          closeTime: new Date(`2023-01-01T${closeTime}:00`),
          restaurantId: restaurant.id,
        },
      });
    }
  }

  // Revalidate the restaurants page
  revalidatePath("/restaurants");

  return { message: "Restaurant hours updated successfully" };
}
