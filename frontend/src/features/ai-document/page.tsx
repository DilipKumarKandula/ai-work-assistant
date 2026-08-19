"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  DocumentResponse,
  processDocument,
} from "./ai-document.service";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "text/plain",
];

export default function AiDocumentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<DocumentResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Only PDF and TXT files are supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be 10 MB or smaller.";
    }

    return null;
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    setError(null);
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setError(validationError);

      event.target.value = "";

      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleProcessDocument = async () => {
    if (!selectedFile) {
      setError("Please select a document first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 60_000);

    try {
      const response = await processDocument(
        selectedFile,
        controller.signal
      );

      setResult(response);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        setError(
          "Document processing timed out. Please try again."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong while processing the document."
        );
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
            AI Document Intelligence
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Understand your documents with AI
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Upload a document to extract its content and prepare it
            for AI-powered analysis.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Upload document
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Supported formats: PDF and TXT. Maximum size: 10 MB.
              </p>
            </div>

            {/* Upload area */}
            <label
              htmlFor="document"
              className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <svg
                  className="h-7 w-7 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
                  />
                </svg>
              </div>

              <p className="text-sm font-medium text-slate-900">
                Click to upload a document
              </p>

              <p className="mt-1 text-sm text-slate-500">
                PDF or TXT
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Maximum file size: 10 MB
              </p>

              <input
                ref={fileInputRef}
                id="document"
                type="file"
                accept=".pdf,.txt,application/pdf,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span className="text-sm font-semibold text-red-600">
                      !
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Unable to process document
                    </p>

                    <p className="mt-1 text-sm text-red-600">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Selected file */}
            {selectedFile && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                    <svg
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M7 3h7l4 4v14H7V3z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M14 3v5h5"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {selectedFile.name}
                    </p>

                    <div className="mt-1 flex gap-3 text-xs text-slate-500">
                      <span>
                        {selectedFile.type || "Unknown type"}
                      </span>

                      <span>
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={loading}
                    className="text-sm text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Process button */}
            <button
              type="button"
              onClick={handleProcessDocument}
              disabled={!selectedFile || loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Processing document...
                </>
              ) : (
                "Process Document"
              )}
            </button>
          </section>

          {/* Result section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Processing result
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Extracted document content will appear here.
              </p>
            </div>

            {/* Initial state */}
            {!selectedFile && !loading && !result && (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-slate-50 px-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <svg
                    className="h-6 w-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6l5 5v11a2 2 0 0 1-2 2z"
                    />
                  </svg>
                </div>

                <p className="text-sm font-medium text-slate-700">
                  No document processed
                </p>

                <p className="mt-1 max-w-sm text-xs text-slate-400">
                  Upload and process a document to see the extracted
                  content here.
                </p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-slate-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

                <p className="mt-4 text-sm font-medium text-slate-700">
                  Processing document...
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Extracting document content
                </p>
              </div>
            )}

            {/* Selected but not processed */}
            {selectedFile && !loading && !result && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      File name
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-800">
                      {selectedFile.name}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      File type
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {selectedFile.type || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">
                      Extracted text
                    </p>
                  </div>

                  <div className="min-h-40 p-4">
                    <p className="text-sm text-slate-400">
                      Click &quot;Process Document&quot; to extract the document
                      text.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="space-y-5">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-700">
                    Document processed successfully
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      File name
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-800">
                      {result.document.name}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      File type
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {result.document.type}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      File size
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {result.document.sizeInKB} KB
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Pages
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {result.document.pageCount ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">
                      Extracted text
                    </p>
                  </div>

                  <div className="max-h-[450px] overflow-y-auto whitespace-pre-wrap p-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {result.text}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}