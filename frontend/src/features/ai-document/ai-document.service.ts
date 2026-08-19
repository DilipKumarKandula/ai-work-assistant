export interface DocumentMetadata {
  name: string;
  type: string;
  size: number;
  sizeInKB: string;
  pageCount: number | null;
}

export interface DocumentResponse {
  success: boolean;
  document: DocumentMetadata;
  text: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function processDocument(
  file: File,
  signal?: AbortSignal
): Promise<DocumentResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/documents`,
    {
      method: "POST",
      body: formData,
      signal,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to process document"
    );
  }

  return data;
}