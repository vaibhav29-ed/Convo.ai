import { createUploadthing } from "uploadthing/next";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { extractTextFromPDF } from "@/lib/pdf";
import { storeEmbeddings } from "@/lib/vectorstore";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ "application/pdf": { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id! };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const pdfBuffer = await fetch(file.url).then((r) => r.arrayBuffer());
        const buffer = Buffer.from(pdfBuffer);

        const result = await extractTextFromPDF(buffer);

        const pdf = await db.pdf.create({
          data: {
            name: file.name,
            url: file.url,
            key: file.key,
            pageCount: result.numPages,
            userId: metadata.userId,
          },
        });

        if (result.chunks.length > 0) {
          await storeEmbeddings(pdf.id, result.chunks);
        }
      } catch (error) {
        console.error("Failed to process uploaded PDF:", error);
        throw error;
      }
    }),
};
