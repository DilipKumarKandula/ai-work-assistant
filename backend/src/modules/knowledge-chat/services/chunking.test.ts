import { chunkText } from "./chunking.service.js";

const sampleText = `
Artificial intelligence is changing how software applications are built.
AI applications can understand text, answer questions, and process documents.

Retrieval-Augmented Generation, also called RAG, allows an application
to search relevant information before sending context to a language model.

Documents are usually split into smaller chunks because sending an entire
large document to an LLM can be inefficient. Each chunk can later be
converted into an embedding and stored for similarity search.

When a user asks a question, the application converts the question into
an embedding and searches for the most relevant document chunks.
Those retrieved chunks are then provided to the language model as context.
`;

const chunks = chunkText(sampleText, 200, 50);

console.log("Total chunks:", chunks.length);

chunks.forEach((chunk, index) => {
  console.log(`\n--- Chunk ${index + 1} ---`);
  console.log(chunk);
});