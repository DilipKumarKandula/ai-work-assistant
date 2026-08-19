type Message = {
  role: "user" | "assistant";
  content: string;
};

type ConversationResponse = {
  message: {
    role: "assistant";
    content: string;
  };
};

export async function sendConversationMessage(
  messages: Message[]
): Promise<ConversationResponse> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ai-conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to get AI response"
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("AI request timed out. Please try again.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}