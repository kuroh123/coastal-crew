import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { generateEventQRId } from "@/lib/qr-utils";

export async function GET(request) {
  try {
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // const decoded = verifyToken(token);
    // if (!decoded || decoded.role !== "ADMIN") {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const events = await prisma.event.findMany({
      where: {
        isFeatured: true,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        _count: {
          select: {
            registrations: true,
            attendances: true,
          },
        },
      },
    });

    return NextResponse.json(events, {
      headers: {
        "Cache-Control": "no-store, must-revalidate", // 👈 disable caching
      },
    });
  } catch (error) {
    console.error("Events fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
