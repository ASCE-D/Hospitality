import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.$transaction(async (prisma) => {
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      if (role === 'RESTAURANT_OWNER') {
        const restaurant = await prisma.restaurant.create({
          data: {
            name: `${name}'s Restaurant`, // Default name, can be changed later
            ownerId: createdUser.id,
            address: 'To be updated', // Placeholder address
          },
        });

        return {
          ...createdUser,
          restaurantId: restaurant.id,
        };
      }

      return createdUser;
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.role === 'RESTAURANT_OWNER' ? (user as any).restaurantId : undefined,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}