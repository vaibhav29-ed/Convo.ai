import { getPineconeIndex } from "./pinecone";

export async function storeEmbeddings(
  pdfId: string,
  chunks: {
    content: string;
    embedding: number[];
    metadata: { pageNumber: number; chunkIndex: number };
  }[]
) {
  const index = await getPineconeIndex();

  const vectors = chunks.map((chunk) => ({
    id: `${pdfId}-${chunk.metadata.chunkIndex}`,
    values: chunk.embedding,
    metadata: {
      pdfId,
      content: chunk.content,
      pageNumber: chunk.metadata.pageNumber,
      chunkIndex: chunk.metadata.chunkIndex,
    },
  }));

  for (let i = 0; i < vectors.length; i += 100) {
    const batch = vectors.slice(i, i + 100);
    await index.upsert(batch);
  }
}

export async function queryEmbeddings(
  pdfId: string,
  queryEmbedding: number[],
  topK: number = 5
) {
  const index = await getPineconeIndex();

  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
    filter: { pdfId },
  });

  return results.matches.map((match) => ({
    id: match.id,
    content: (match.metadata?.content as string) || "",
    embedding: [],
    metadata: {
      pdfId: (match.metadata?.pdfId as string) || pdfId,
      pageNumber: (match.metadata?.pageNumber as number) || 0,
      chunkIndex: (match.metadata?.chunkIndex as number) || 0,
    },
    score: match.score || 0,
  }));
}
