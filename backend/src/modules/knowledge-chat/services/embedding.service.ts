import { InferenceClient } from "@huggingface/inference";

const hfToken = process.env.HF_TOKEN;

if (!hfToken) {
  throw new Error("HF_TOKEN is not configured");
}

const hf = new InferenceClient(hfToken);

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  const embedding = await hf.featureExtraction({
    provider: "deepinfra",
    model: "Qwen/Qwen3-Embedding-0.6B",
    inputs: text,
  });

  return embedding[0] as number[];
}