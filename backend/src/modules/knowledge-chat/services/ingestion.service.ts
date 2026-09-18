import { pool } from "../../../config/database.js";
import { chunkText } from "./chunking.service.js";
import { generateEmbedding } from "./embedding.service.js";

export interface IngestDocumentInput {
  name: string;
  fileType?: string;
  fileSize?: number;
  text: string;
}

export async function ingestDocument(
  document: IngestDocumentInput
): Promise<number> {
  const chunks = chunkText(document.text);

  if (chunks.length === 0) {
    throw new Error("Document contains no readable text");
  }

  const documentResult = await pool.query(
    `
    INSERT INTO documents
      (name, file_type, file_size)
    VALUES
      ($1, $2, $3)
    RETURNING id
    `,
    [
      document.name,
      document.fileType ?? null,
      document.fileSize ?? null,
    ]
  );

  const documentId = documentResult.rows[0].id;

  for (let index = 0; index < chunks.length; index++) {
    const chunk = chunks[index];

    if (!chunk) {
      continue;
    }

    const embedding = await generateEmbedding(chunk);

    await pool.query(
      `
      INSERT INTO document_chunks
        (document_id, chunk_index, content, embedding)
      VALUES
        ($1, $2, $3, $4::vector)
      `,
      [
        documentId,
        index,
        chunk,
        JSON.stringify(embedding),
      ]
    );
  }

  return documentId;
}