// app/actions/createDeliveryOrder.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function createDeliveryOrder(formData: FormData) {
  const name = formData.get('name') as string
  const restaurantId = formData.get('restaurantId') as string
  const address = formData.get('address') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const orderItemsJson = formData.get('orderItems') as string
  const orderItems = JSON.parse(orderItemsJson)

  try {
    const deliveryOrder = await prisma.deliveryOrder.create({
      data: {
        name,
        restaurantId,
        address,
        phoneNumber,
        orderItems: {
          create: orderItems.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        totalAmount: orderItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0),
      },
      include: {
        orderItems: true,
      },
    })

    revalidatePath('/delivery')
    return { success: true, data: deliveryOrder }
  } catch (error) {
    console.error('Error creating delivery order:', error)
    return { success: false, error: 'Error creating delivery order' }
  }
}