import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateText(prompt: string) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? "";
}


type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function generateChat(messages: ChatMessage[]) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages,
  });

  return response.choices[0]?.message?.content ?? "";
}