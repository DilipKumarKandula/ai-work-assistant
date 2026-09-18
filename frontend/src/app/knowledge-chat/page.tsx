"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  askKnowledgeChat,
  type KnowledgeChatResponse,
} from "@/features/knowledge-chat/services/knowledge-chat.service";

export default function KnowledgeChatPage() {
  const [question, setQuestion] = useState("");
  const [result, setResult] =
    useState<KnowledgeChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await askKnowledgeChat(trimmedQuestion);

      setResult(response);
      setQuestion("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(suggestion: string) {
    setQuestion(suggestion);
    setError("");
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <svg
                className="h-6 w-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5M6 19h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-semibold">
                Knowledge Chat
              </h1>

              <p className="text-sm text-gray-500">
                Ask questions about your documents
              </p>
            </div>

          </div>
        </header>

        {/* Chat Content */}
        <div className="flex flex-1 flex-col">

          {/* Empty State */}
          {!result && !loading && (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                <svg
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h4m6-7.5A2.5 2.5 0 0 0 16.5 6h-9A2.5 2.5 0 0 0 5 8.5v7A2.5 2.5 0 0 0 7.5 18H9l3 3 3-3h1.5a2.5 2.5 0 0 0 2.5-2.5v-7Z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">
                Ask your knowledge base
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                Ask questions about your uploaded documents.
                Relevant information will be retrieved before
                generating the answer.
              </p>

              {/* Suggestions */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  "What is in my document?",
                  "Summarize the main topics",
                  "What can teachers do?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-1 items-center justify-center py-20">
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Searching your knowledge base
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Retrieving relevant information...
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Conversation */}
          {result && !loading && (
            <div className="mx-auto w-full max-w-3xl py-8">

              {/* User Question */}
              <div className="mb-8 flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue-600 px-5 py-3.5 shadow-sm">
                  <p className="text-sm leading-6 text-white">
                    {result.question}
                  </p>
                </div>
              </div>

              {/* AI Answer */}
              <div className="flex items-start gap-3">

                {/* AI Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2m0 14v2M5.64 5.64l1.42 1.42m9.9 9.9 1.42 1.42M3 12h2m14 0h2M5.64 18.36l1.42-1.42m9.9-9.9 1.42-1.42"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />
                  </svg>
                </div>

                {/* Answer Card */}
                <div className="min-w-0 flex-1">

                  <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white p-5 shadow-sm">

                    {/* Answer Header */}
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        AI Answer
                      </span>

                      <span className="h-1 w-1 rounded-full bg-gray-300" />

                      <span className="text-xs text-gray-400">
                        Knowledge Base
                      </span>
                    </div>

                    {/* Markdown Answer */}
                    <div className="text-sm text-gray-700">

                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{

                          h1: ({ children }) => (
                            <h1 className="mb-4 mt-6 text-xl font-semibold text-gray-900 first:mt-0">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="mb-3 mt-6 text-lg font-semibold text-gray-900 first:mt-0">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-5 text-base font-semibold text-gray-900">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="mb-4 text-sm leading-7 text-gray-700 last:mb-0">
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
                            <ul className="mb-4 ml-5 list-disc space-y-2 text-sm leading-6">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="mb-4 ml-5 list-decimal space-y-3 text-sm leading-6">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="pl-1">
                              {children}
                            </li>
                          ),

                          blockquote: ({ children }) => (
                            <blockquote className="my-4 border-l-4 border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-gray-600">
                              {children}
                            </blockquote>
                          ),

                          hr: () => (
                            <hr className="my-6 border-gray-200" />
                          ),

                          table: ({ children }) => (
                            <div className="my-5 overflow-x-auto rounded-lg border border-gray-200">
                              <table className="min-w-full border-collapse text-sm">
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
                            <th className="border-b border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-700">
                              {children}
                            </th>
                          ),

                          td: ({ children }) => (
                            <td className="border-b border-gray-100 px-4 py-3 text-sm text-gray-600">
                              {children}
                            </td>
                          ),

                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                            >
                              {children}
                            </a>
                          ),

                          code: ({
                            children,
                            className,
                          }) => {
                            const isCodeBlock =
                              className?.includes(
                                "language-"
                              );

                            if (isCodeBlock) {
                              return (
                                <pre className="my-5 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100">
                                  <code>
                                    {children}
                                  </code>
                                </pre>
                              );
                            }

                            return (
                              <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
                                {children}
                              </code>
                            );
                          },

                        }}
                      >
                        {result.answer}
                      </ReactMarkdown>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-auto mb-6 w-full max-w-3xl rounded-xl border border-red-200 bg-red-50 px-4 py-3">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 font-semibold text-red-600">
                  !
                </div>

                <p className="text-sm text-red-700">
                  {error}
                </p>

              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white py-4">

          <div className="mx-auto max-w-3xl">

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-blue-300 focus-within:shadow-md"
            >

              <div className="flex items-end gap-2">

                <textarea
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();

                      if (!loading) {
                        event.currentTarget.form?.requestSubmit();
                      }
                    }
                  }}
                  rows={1}
                  placeholder="Ask something about your documents..."
                  className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  disabled={
                    loading || !question.trim()
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ask question"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h13m-6-6 6 6-6 6"
                    />
                  </svg>
                </button>

              </div>

              <div className="px-4 pb-1 pt-1">
                <span className="text-[11px] text-gray-400">
                  Enter to send · Shift + Enter for new line
                </span>
              </div>

            </form>

          </div>
        </div>

      </div>
    </main>
  );
}