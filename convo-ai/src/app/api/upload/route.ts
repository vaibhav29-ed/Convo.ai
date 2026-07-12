import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pdfs = await db.pdf.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pdfs });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch PDFs" },
      { status: 500 }
    );
  }
}
