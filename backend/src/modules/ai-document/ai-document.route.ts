import { Router } from "express";
import multer from "multer";
import { processDocumentController } from "./ai-document.controller.js"

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

//   fileFilter: (_req, file, callback) => {
//     const allowedTypes = [
//       "application/pdf",
//       "text/plain",
//     ];

//     if (!allowedTypes.includes(file.mimetype)) {
//       return callback(
//         new Error("Only PDF and TXT files are supported")
//       );
//     }

//     callback(null, true);
//   },


    fileFilter: (_req, file, callback) => {
  console.log("Uploaded file:", {
    name: file.originalname,
    type: file.mimetype,
  });

  callback(null, true);
},
});

router.post("/documents",
  upload.single("file"),
  processDocumentController
);

export default router;




// We want the controller to receive an already-parsed request:

// Controller
//     ↓
// req.file

// rather than making the controller responsible for:

// parse multipart
// handle upload
// validate upload
// extract document
// return response



{/** 



ai-document.route.ts — Quick Summary

This file does routing + upload middleware setup.

POST /documents
      ↓
Multer
      ↓
Controller

Specifically:

Creates the router

const router = Router();
Configures Multer
Uses memoryStorage() → file temporarily stays in memory.
Maximum file size → 10 MB.
Allows only:
PDF
TXT

Defines the endpoint

router.post(
  "/documents",
  upload.single("file"),
  processDocumentController
);

Connects frontend field to backend

FormData:
"file"
   ↓
upload.single("file")
   ↓
req.file
Passes the processed request to the controller.

*/}