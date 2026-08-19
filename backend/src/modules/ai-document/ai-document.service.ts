import path from "path";
import { PDFParse } from "pdf-parse";

interface ProcessedDocument {
  document: {
    name: string;
    type: string;
    size: number;
    sizeInKB: string;
    pageCount: number | null;
  };
  text: string;
}

export async function processDocument(
  file: Express.Multer.File
): Promise<ProcessedDocument> {
  let extractedText = "";
  let pageCount: number | null = null;

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (
    file.mimetype === "application/pdf" ||
    extension === ".pdf"
  ) {
    const parser = new PDFParse({
      data: file.buffer,
    });

    try {
      const pdfData = await parser.getText();

      extractedText = pdfData.text.trim();
      pageCount = pdfData.total;
    } finally {
      await parser.destroy();
    }
  } else if (
    file.mimetype === "text/plain" ||
    extension === ".txt"
  ) {
    extractedText = file.buffer
      .toString("utf-8")
      .trim();
  }

  if (!extractedText) {
    throw new Error(
      "No readable text could be extracted from this document"
    );
  }

  return {
    document: {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      sizeInKB: (file.size / 1024).toFixed(2),
      pageCount,
    },
    text: extractedText,
  };
}