"use server";

import { prisma } from "@/utils/prismaDB";
import { revalidatePath } from "next/cache";

export async function updateRestaurantPreferences({
  restaurantId,
  mail,
  whatsapp,
}: {
  restaurantId: string;
  mail?: boolean;
  whatsapp?: boolean;
}) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        owner: {
          select: {
            email: true,
          },
        },
        devices: {
          select: {
            phoneNumber: true,
          },
        },
      },
    });

    if (!restaurant) {
      return { success: false, error: "Restaurant not found" };
    }

    if (mail && !restaurant.owner.email) {
      return {
        success: false,
        error: "Please update your email ID to enable mail notifications",
      };
    }

    if (whatsapp && !restaurant.devices.some((device) => device.phoneNumber)) {
      return {
        success: false,
        error:
          "Please update your phone number to enable WhatsApp notifications",
      };
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
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

export async function getNotificationPreferences(restaurantId: string) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return { success: false, error: "Restaurant not found" };
    }

    return {
      success: true,
      data: { whatsapp: restaurant.whatsapp, mail: restaurant.mail },
    };
  } catch (error) {
    console.error("Failed to update restaurant preferences:", error);
    return {
      success: false,
      error: "Failed to update restaurant preferences",
    };
  }
}
