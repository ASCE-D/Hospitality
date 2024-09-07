import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["CONFIRMED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updatedReservation = await prisma.reservation.update({
    where: { id },
    data: { status },
    include: { user: true, restaurant: true },
  });

  

  return NextResponse.json({ reservation: updatedReservation });
}
