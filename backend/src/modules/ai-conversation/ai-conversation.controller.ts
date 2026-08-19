import type { Request, Response } from "express";
import { generateConversationResponse } from "./ai-conversation.service.js";

export const sendConversation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({
        message: "Messages must be a non-empty array",
      });
      return;
    }

    const result = await generateConversationResponse(messages);

    res.status(200).json(result);
  } catch (error) {
    console.error("Conversation controller error:", error);

    res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
};