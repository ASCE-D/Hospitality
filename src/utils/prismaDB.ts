import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


 // {
    //   "id": "cm1j41eb600037vk4qukoyree",
    //   "name": "Testing",
    //   "image": [
    //     "/images/restaurants/app/M.jpg"
    //   ],
    //   "recommended": false,
    //   "description": "Enjoy refined aperitifs and delicious bites in a stylish environment in the center of Genova",
    //   "rating": 4.6,
    //   "address": "Via S. Vincenzo, 89r, 16121 Genova GE",
    //   "location": "https://www.google.com/maps/place/data=!4m2!3m1!1s0x12d343321c62b52f:0xb0ec050dfd0566c0?sa=X&ved=1t:8290&ictx=111",
    //   "phone": "T. +39 010 860 8927",
    //   "hours": "12:30-14:30 | 19:00-23:00",
    //   "closed": {
    //     "LUNCH": [
    //       "Monday",
    //       "Tuesday"
    //     ],
    //     "DINNER": []
    //   },
    //   "notes": "(Closed on Monday and Tuesday at lunch)",
    
    //   "mealType": [
    //     "LUNCH",
    //     "DINNER"
    //   ]
    // }