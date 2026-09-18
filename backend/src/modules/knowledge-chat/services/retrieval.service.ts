import { pool } from "../../../config/database.js";
import { generateEmbedding } from "./embedding.service.js";

export interface RetrievedChunk {
  id: number;
  documentId: number;
  chunkIndex: number;
  content: string;
  similarity: number;
}

export async function retrieveRelevantChunks(
  question: string,
  topK = 3,
  similarityThreshold = 0.5
): Promise<RetrievedChunk[]> {
  const questionEmbedding = await generateEmbedding(question);

  const result = await pool.query(
    `
    SELECT
      id,
      document_id,
      chunk_index,
      content,
      1 - (embedding <=> $1::vector) AS similarity
    FROM document_chunks
    WHERE 1 - (embedding <=> $1::vector) >= $3
    ORDER BY embedding <=> $1::vector
    LIMIT $2
    `,
    [
      JSON.stringify(questionEmbedding),
      topK,
      similarityThreshold,
    ]
  );

  return result.rows.map((row) => ({
    id: row.id,
    documentId: row.document_id,
    chunkIndex: row.chunk_index,
    content: row.content,
    similarity: Number(row.similarity),
  }));
}