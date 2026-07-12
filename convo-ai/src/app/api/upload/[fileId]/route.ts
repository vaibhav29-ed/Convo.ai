import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { getPineconeIndex } from "@/lib/pinecone";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(
  req: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pdf = await db.pdf.findFirst({
      where: {
        id: params.fileId,
        userId: session.user.id,
      },
    });

    if (!pdf) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    const index = await getPineconeIndex();
    await index.deleteMany({ filter: { pdfId: params.fileId } });

    await utapi.deleteFiles(pdf.key);

    await db.pdf.delete({
      where: { id: params.fileId },
    });

    return NextResponse.json({ message: "PDF deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete PDF" },
      { status: 500 }
    );
  }
}
