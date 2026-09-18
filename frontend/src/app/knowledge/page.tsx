"use client";

import { useState } from "react";
import {
  addKnowledge,
} from "@/features/knowledge-chat/services/knowledge-chat.service";

export default function KnowledgePage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleAddKnowledge() {
    if (!name.trim()) {
      setError("Please enter a knowledge name.");
      setSuccess("");
      return;
    }

    if (!content.trim()) {
      setError("Please enter knowledge content.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await addKnowledge({
        name: name.trim(),
        content: content.trim(),
      });

      setSuccess(
        `${response.message} Document ID: ${response.documentId}`
      );

      setName("");
      setContent("");
    } catch (error) {
      console.error("Failed to add knowledge:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to add knowledge."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Knowledge Base
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add information that can be searched by Knowledge Chat.
        </p>
      </div>

      {/* Add Knowledge */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Knowledge
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add information to your RAG knowledge base.
          </p>
        </div>

        <div className="space-y-6">

          {/* Knowledge Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Knowledge Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Example: Learning Management System"
              disabled={loading}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                disabled:cursor-not-allowed
                disabled:bg-gray-50
              "
            />
          </div>

          {/* Knowledge Content */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-800">
                Knowledge Content
              </label>

              <span className="text-xs text-gray-500">
                {content.length} characters
              </span>
            </div>

            <textarea
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="Enter or paste the information you want to add to your knowledge base..."
              rows={12}
              disabled={loading}
              className="
                w-full
                resize-y
              
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-sm
                leading-6
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                disabled:cursor-not-allowed
                disabled:bg-gray-50
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm text-green-700">
                {success}
              </p>
            </div>
          )}

          {/* Action */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddKnowledge}
              disabled={loading}
              className="
                rounded-lg
                bg-blue-600
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Adding Knowledge..."
                : "Add Knowledge"}
            </button>
          </div>

        </div>
      </div>

      {/* Stored Knowledge */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Stored Knowledge
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Knowledge sources available for retrieval.
          </p>
        </div>

        <div className="p-6">

          <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">

              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <span className="text-xl">
                  📚
                </span>
              </div>

              <p className="text-sm font-medium text-gray-700">
                No knowledge list loaded yet
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Knowledge has been stored, but listing stored
                knowledge will be added separately.
              </p>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}