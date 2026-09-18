import { chunkText } from "./chunking.service.js";
import { generateEmbedding } from "./embedding.service.js";

export interface DocumentChunk {
  text: string;
  embedding: number[];
}

export async function createDocumentEmbeddings(
  documentText: string
): Promise<DocumentChunk[]> {
  const chunks = chunkText(documentText);

  const documentChunks: DocumentChunk[] = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    documentChunks.push({
      text: chunk,
      embedding,
    });
  }

  return documentChunks;
}