import type { Request, Response } from "express";
import { processDocument } from "./ai-document.service.js";

export async function processDocumentController(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document file is required",
      });
    }

    const result = await processDocument(req.file);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Document processing error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to process document",
    });
  }
}







// ai-document.controller.ts — Summary

// The controller is responsible for handling the HTTP request and response.

// Multer
//   ↓
// req.file
//   ↓
// Controller
//   ↓
// Service
//   ↓
// Controller
//   ↓
// JSON response

// It does 4 things:

// Checks whether a file was received

// if (!req.file)

// If not → 400 Bad Request.

// Passes the file to the service

// processDocument(req.file)

// Returns the successful result

// res.status(200).json(...)

// Catches unexpected errors

// catch (error)

// → returns 500 Internal Server Error.

// Remember

// Route: maps request + runs middleware
// Controller: handles HTTP request/response
// Service: does the actual document processing