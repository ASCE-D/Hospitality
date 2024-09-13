'use server'

import { prisma } from "@/utils/prismaDB";
import { revalidatePath } from "next/cache";


export async function updateRestaurantPreferences(
  restaurantId: string,
  mail: boolean,
  whatsapp: boolean
) {
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: restaurantId,
      },
      data: {
        mail,
        whatsapp,
      },
    });

    revalidatePath(`/restaurants/${restaurantId}`);

    return { success: true, data: updatedRestaurant };
  } catch (error) {
    console.error("Failed to update restaurant preferences:", error);
    return { success: false, error: "Failed to update restaurant preferences" };
  }
}