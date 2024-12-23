// types.ts
type PaginatedResponse<T> = {
  data: T[];
  metadata: {
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
  };
};

// route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prismaDB";

const ITEMS_PER_PAGE = 12;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, page = 1 } = body;

    // Verify if the userId matches the session user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid user" },
        { status: 403 },
      );
    }

    // Get total count for pagination
    const totalCount = await prisma.foodReservation.count();

    // Calculate pagination values
    const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const currentPage = Math.min(Math.max(1, page), pageCount);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    // Fetch paginated food reservations
    const foodReservations = await prisma.foodReservation.findMany({
      take: ITEMS_PER_PAGE,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: { restaurant: true },
    });

    const response: PaginatedResponse<(typeof foodReservations)[0]> = {
      data: foodReservations,
      metadata: {
        totalCount,
        pageCount,
        currentPage,
        perPage: ITEMS_PER_PAGE,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
