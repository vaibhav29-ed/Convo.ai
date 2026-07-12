import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { generateAnswer, getEmbedding } from "@/lib/pdf";
import { queryEmbeddings } from "@/lib/vectorstore";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, pdfId } = await req.json();

    if (!message || !pdfId) {
      return NextResponse.json(
        { error: "Message and PDF ID are required" },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length > 4000) {
      return NextResponse.json(
        { error: "Message must be a string under 4000 characters" },
        { status: 400 }
      );
    }

    const pdf = await db.pdf.findFirst({
      where: {
        id: pdfId,
        userId: session.user.id,
      },
    });

    if (!pdf) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    await db.message.create({
      data: {
        role: "user",
        content: message,
        pdfId,
      },
    });

    const queryEmbedding = await getEmbedding(message, "query");
    const relevantChunks = await queryEmbeddings(pdfId, queryEmbedding, 5);

    const context = relevantChunks
      .map(
        (chunk, i) =>
          `[Chunk ${i + 1} (Page ${chunk.metadata.pageNumber})]: ${chunk.content}`
      )
      .join("\n\n");

    const answer = await generateAnswer(message, context);

    await db.message.create({
      data: {
        role: "assistant",
        content: answer,
        pdfId,
      },
    });

    return NextResponse.json({
      answer,
      sources: relevantChunks.map((chunk) => ({
        content: chunk.content.substring(0, 200) + "...",
        pageNumber: chunk.metadata.pageNumber,
        score: chunk.score,
      })),
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pdfId = searchParams.get("pdfId");

    if (!pdfId) {
      return NextResponse.json(
        { error: "PDF ID is required" },
        { status: 400 }
      );
    }

    const messages = await db.message.findMany({
      where: {
        pdfId,
        pdf: { userId: session.user.id },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
