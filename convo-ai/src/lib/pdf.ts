import pdfParse from "pdf-parse";
import openai from "./openai";

export interface TextChunk {
  content: string;
  embedding: number[];
  metadata: {
    pageNumber: number;
    chunkIndex: number;
  };
}

export async function extractTextFromPDF(buffer: Buffer): Promise<{
  text: string;
  numPages: number;
  chunks: TextChunk[];
}> {
  const data = await pdfParse(buffer);

  const text = data.text;
  const numPages = data.numpages;

  const chunks = await chunkText(text);

  return { text, numPages, chunks };
}

async function chunkText(text: string): Promise<TextChunk[]> {
  const chunkSize = 1000;
  const chunkOverlap = 200;
  const chunks: TextChunk[] = [];

  for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
    const chunk = text.slice(i, i + chunkSize);
    if (chunk.trim().length === 0) continue;

    const embedding = await getEmbedding(chunk, "passage");

    chunks.push({
      content: chunk,
      embedding,
      metadata: {
        pageNumber: Math.floor(i / 3000) + 1,
        chunkIndex: chunks.length,
      },
    });
  }

  return chunks;
}

export async function getEmbedding(
  text: string,
  inputType: "query" | "passage" = "passage"
): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "nvidia/nv-embedqa-e5-v5",
    input: text,
    input_type: inputType,
  } as any);
  return response.data[0].embedding;
}

export async function generateAnswer(
  question: string,
  context: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "minimaxai/minimax-m2.7",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that answers questions based on the provided document context. 
        If the answer is not in the context, say "I don't have enough information to answer that question."
        Always cite which part of the document your answer comes from when possible.
        Be concise and accurate.`,
      },
      {
        role: "user",
        content: `Context from document:\n${context}\n\nQuestion: ${question}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || "No answer generated.";
}
