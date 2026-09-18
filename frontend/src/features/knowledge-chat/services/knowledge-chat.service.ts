const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export interface KnowledgeChatResponse {
  question: string;
  answer: string;
}

export interface AddKnowledgeInput {
  name: string;
  content: string;
}

export interface AddKnowledgeResponse {
  message: string;
  documentId: number;
}

export async function askKnowledgeChat(
  question: string
): Promise<KnowledgeChatResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/knowledge-chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        "Failed to get knowledge answer"
    );
  }

  return response.json();
}

export async function addKnowledge(
  data: AddKnowledgeInput
): Promise<AddKnowledgeResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/knowledge-chat/ingest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        "Failed to add knowledge"
    );
  }

  return response.json();
} 