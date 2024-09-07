import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { restaurantId, dateTime, partySize } = body;

  if (!restaurantId || !dateTime || !partySize) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  const reservation = await prisma.reservation.create({
    data: {
      dateTime: new Date(dateTime),
      partySize,
      userId: user?.id as string,
      restaurantId,
      status: "PENDING",
    },
  });

  revalidatePath("/dashboard/restaurant")
  return NextResponse.json({ reservation });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const restaurantId = searchParams.get("restaurantId");

  let reservations;

  if (userId) {
    reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { restaurant: true },
    });
  } else if (restaurantId) {
    reservations = await prisma.reservation.findMany({
      where: { restaurantId },
      include: { user: true },
    });
  } else {
    return NextResponse.json(
      { error: "Missing userId or restaurantId" },
      { status: 400 },
    );
  }

  return NextResponse.json({ reservations });
}
