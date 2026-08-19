export async function analyzeText(
  text: string,
  operation: string
) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(
      `{NEXT_PUBLIC_API_UR}/api/ai-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          operation,
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to analyze text");
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}