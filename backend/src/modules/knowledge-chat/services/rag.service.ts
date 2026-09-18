import { groq } from "../../../ai/groq.js";
import { retrieveRelevantChunks } from "./retrieval.service.js";
import { buildContext } from "./context.service.js";

export async function generateRagAnswer(
  question: string
): Promise<string> {
  const chunks = await retrieveRelevantChunks(
    question,
    3
  );

  if (chunks.length === 0) {
    return "I could not find relevant information in the document.";
  }

  const context = buildContext(chunks);

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "Answer the question using only the provided document context. If the answer is not present in the context, say that the information was not found in the document.",
      },
      {
        role: "user",
        content: `
Context:
${context}

Question:
${question}
`,
      },
    ],
  });

  return (
    completion.choices[0]?.message?.content ?? ""
  );
}