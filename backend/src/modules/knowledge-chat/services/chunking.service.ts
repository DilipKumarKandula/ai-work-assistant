export function chunkText(
  text: string,
  chunkSize = 1000,
  chunkOverlap = 200
): string[] {
  const chunks: string[] = [];
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return chunks;
  }

  let start = 0;

  while (start < normalizedText.length) {
    const end = Math.min(
      start + chunkSize,
      normalizedText.length
    );

    const chunk = normalizedText.slice(start, end);

    chunks.push(chunk);

    start += chunkSize - chunkOverlap;
  }

  return chunks;
}