import type { Request, Response } from "express";

import { generateRagAnswer } from "../services/rag.service.js";
import { ingestDocument } from "../services/ingestion.service.js";

export async function askKnowledgeChat(
  req: Request,
  res: Response
) {
  try {
    const { question } = req.body;

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const answer = await generateRagAnswer(
      question.trim()
    );

    return res.status(200).json({
      question: question.trim(),
      answer,
    });
  } catch (error) {
    console.error(
      "Knowledge chat failed:",
      error
    );

    return res.status(500).json({
      message: "Failed to generate knowledge answer",
    });
  }
}

export async function addKnowledge(
  req: Request,
  res: Response
) {
  try {
    const { name, content } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        message: "Knowledge name is required",
      });
    }

    if (
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Knowledge content is required",
      });
    }

    const documentId = await ingestDocument({
      name: name.trim(),
      fileType: "text/plain",
      fileSize: Buffer.byteLength(
        content,
        "utf8"
      ),
      text: content.trim(),
    });

    return res.status(201).json({
      message: "Knowledge added successfully",
      documentId,
    });
  } catch (error) {
    console.error(
      "Knowledge ingestion failed:",
      error
    );

    return res.status(500).json({
      message: "Failed to add knowledge",
    });
  }
}