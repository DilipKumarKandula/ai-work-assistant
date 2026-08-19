import { generateChat } from "../../ai/groq.js";

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export const generateConversationResponse = async (
  messages: ConversationMessage[]
) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages are required");
  }

  for (const message of messages) {
    if (
      !message.role ||
      !["user", "assistant"].includes(message.role) ||
      !message.content?.trim()
    ) {
      throw new Error("Invalid conversation message");
    }
  }

  const aiMessages = [
    {
      role: "system" as const,
      content:
        "You are a helpful AI assistant. Answer the user's questions clearly and practically.",
    },
    ...messages,
  ];

  const content = await generateChat(aiMessages);

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  return {
    message: {
      role: "assistant" as const,
      content,
    },
  };
};