"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { analyzeText } from "./ai-text.service";

export default function AItext() {
  const [textInput, setTextInput] = useState("");
  const [operation, setOperation] = useState("Summarize");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleAnalyze() {
    if (!textInput.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    setResult("");
    setCopied(false);
    setLoading(true);

    try {
      const response = await analyzeText(
        textInput,
        operation
      );

      setResult(response.result);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOnChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setTextInput(event.target.value);

    if (event.target.value.trim()) {
      setError("");
    }
  }

  function handleOperationChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setOperation(event.target.value);
    setResult("");
    setError("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          AI Text Intelligence
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Analyze, transform, and extract insights from your text using AI.
        </p>
      </div>

      {/* Input Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="space-y-6">

          {/* Text Input */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Input Text
              </label>

              <span className="text-xs text-gray-500">
                {textInput.length} characters
              </span>
            </div>

            <textarea
              value={textInput}
              onChange={handleOnChange}
              placeholder="Enter or paste your text here..."
              rows={12}
              className="
                w-full
                resize-y
                
                border
                border-gray-300
                bg-white
                p-4
                text-sm
                leading-6
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

            <div className="mt-2 text-xs text-gray-500">
              Enter the content you want AI to analyze or transform.
            </div>
          </div>

          {/* Operation + Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

            {/* Operation */}
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Operation
              </label>

              <select
                value={operation}
                onChange={handleOperationChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  p-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="Summarize">
                  Summarize
                </option>

                <option value="Rewrite">
                  Rewrite
                </option>

                <option value="Extract Key Points">
                  Extract Key Points
                </option>

                <option value="Classify">
                  Classify
                </option>
              </select>
            </div>

            {/* Analyze Button */}
            <button
              type="button"
              onClick={handleAnalyze}
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
                sm:w-auto
              "
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Result Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Result Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              AI Result
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {result
                ? `${operation} result`
                : "Your AI result will appear here."}
            </p>
          </div>

          {/* Copy Button */}
          {result && (
            <button
              type="button"
              onClick={handleCopy}
              className="
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                text-xs
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {/* Result Content */}
        <div className="min-h-[280px] px-6 py-6">

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-500">

                <div
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-gray-300
                    border-t-blue-600
                  "
                />

                <span>
                  AI is analyzing your text...
                </span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !result && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <span className="text-xl">
                    ✨
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-700">
                  No result yet
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Enter some text and select an operation to get started.
                </p>
              </div>
            </div>
          )}

          {/* Markdown Result */}
          {!loading && result && (
            <div
              className="
                max-w-none
                text-sm
                leading-7
                text-gray-800
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-4 text-2xl font-bold text-gray-900">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-xl font-semibold text-gray-900">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-lg font-semibold text-gray-900">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-4 leading-7 text-gray-700">
                      {children}
                    </p>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),

                  em: ({ children }) => (
                    <em className="italic text-gray-700">
                      {children}
                    </em>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-5 ml-6 list-disc space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-5 ml-6 list-decimal space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1 leading-7">
                      {children}
                    </li>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-5 border-l-4 border-blue-400 bg-blue-50 px-4 py-3 text-gray-700">
                      {children}
                    </blockquote>
                  ),

                  hr: () => (
                    <hr className="my-6 border-gray-200" />
                  ),

                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-700"
                    >
                      {children}
                    </a>
                  ),

                  code: ({ children }) => (
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre className="mb-5 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm leading-6 text-white">
                      {children}
                    </pre>
                  ),

                  table: ({ children }) => (
                    <div className="mb-5 overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),

                  thead: ({ children }) => (
                    <thead className="bg-gray-50">
                      {children}
                    </thead>
                  ),

                  th: ({ children }) => (
                    <th className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {children}
                    </td>
                  ),
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}