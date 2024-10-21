'use server'

import { prisma } from '@/utils/prismaDB';
import { Restaurant } from '@prisma/client';

export async function getAllRestaurants(): Promise<Restaurant[]> {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
        hours: true,
        menu:true,
      },
    });

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to fetch restaurants');
  }
}