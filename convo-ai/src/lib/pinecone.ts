import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export async function getPineconeClient() {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
}

export async function getPineconeIndex() {
  const client = await getPineconeClient();
  return client.index(process.env.PINECONE_INDEX_NAME || "convo-ai");
}
