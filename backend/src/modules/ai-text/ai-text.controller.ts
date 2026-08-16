import type { Request, Response } from "express";
import { processAiText } from "./ai-text.service.js";

export async function aiTextController(req: Request, res: Response) {
  
  const { text, operation } = req.body;
  if (!text || !text.trim()) {
  return res.status(400).json({
    success: false,
    message: "Text is required.",
  });
}
const validOperations = [
  "Summarize",
  "Rewrite",
  "Extract Key Points",
  "Classify",
];

if (!validOperations.includes(operation)) {
  return res.status(400).json({
    success: false,
    message: "Invalid operation.",
  });
}


try {
  const result = await processAiText(text, operation);

  res.json({
    success: true,
    result,
  });
  } catch (error) {
  console.error("AI processing error:", error);

  return res.status(500).json({
    success: false,
    message: "Unable to process your request. Please try again.",
  });
}
}