import { generateText } from "../../ai/groq.js";

export async function processAiText(
  text: string,
  operation: string
) {
  const prompt = `
You are an AI text assistant.

Operation: ${operation}

Perform the requested operation on the following text:

${text}
`;

  const result = await generateText(prompt);

  return result;
}