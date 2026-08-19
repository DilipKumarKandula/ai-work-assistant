"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendConversationMessage } from "./ai-conversation.service";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIConversationPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim() || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await sendConversationMessage(updatedMessages);

      const assistantMessage: Message = {
        role: "assistant",
        content: response.message.content,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    setInput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              AI Conversation
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Ask questions and continue the conversation with context.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearConversation}
            disabled={loading || messages.length === 0}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear
          </button>
        </header>

        {/* Conversation */}
        <section className="flex-1 overflow-y-auto pb-6">
          {messages.length === 0 ? (
            <div className="flex min-h-[55vh] items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  AI
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Start a conversation
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ask the AI anything and use follow-up questions to continue
                  the conversation with context.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={index}
                    className={
                      isUser
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    {isUser ? (
                      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-4 py-3 text-sm leading-6 text-white shadow-sm sm:max-w-[70%]">
                        <p className="whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    ) : (
                      <article className="w-full max-w-4xl text-slate-800">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-semibold text-white">
                            AI
                          </div>

                          <span className="text-sm font-semibold text-slate-700">
                            Assistant
                          </span>
                        </div>

                        <div className="text-[15px] leading-7">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="mb-4 mt-6 text-2xl font-bold tracking-tight text-slate-950 first:mt-0">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="mb-3 mt-6 text-xl font-semibold text-slate-950 first:mt-0">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="mb-2 mt-5 text-lg font-semibold text-slate-950 first:mt-0">
                                  {children}
                                </h3>
                              ),

                              p: ({ children }) => (
                                <p className="mb-4 last:mb-0">
                                  {children}
                                </p>
                              ),

                              ul: ({ children }) => (
                                <ul className="mb-4 list-disc space-y-1 pl-6">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="mb-4 list-decimal space-y-1 pl-6">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="pl-1">
                                  {children}
                                </li>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-semibold text-slate-950">
                                  {children}
                                </strong>
                              ),

                              blockquote: ({ children }) => (
                                <blockquote className="my-4 pl-4 italic text-slate-600">
                                  {children}
                                </blockquote>
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

                              table: ({ children }) => (
                                <div className="my-5 overflow-x-auto">
                                  <table className="w-full min-w-[500px] text-left text-sm">
                                    {children}
                                  </table>
                                </div>
                              ),

                              thead: ({ children }) => (
                                <thead className="bg-slate-100 text-slate-700">
                                  {children}
                                </thead>
                              ),

                              th: ({ children }) => (
                                <th className="px-4 py-3 font-semibold">
                                  {children}
                                </th>
                              ),

                              td: ({ children }) => (
                                <td className="px-4 py-3 align-top">
                                  {children}
                                </td>
                              ),

                              tr: ({ children }) => (
                                <tr className="border-b border-slate-200 last:border-b-0">
                                  {children}
                                </tr>
                              ),

                              code: ({ children, className }) => {
                                const isBlock =
                                  className?.startsWith("language-");

                                if (isBlock) {
                                  return (
                                    <code
                                      className={`${className} block overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100`}
                                    >
                                      {children}
                                    </code>
                                  );
                                }

                                return (
                                  <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800">
                                    {children}
                                  </code>
                                );
                              },

                              pre: ({ children }) => (
                                <pre className="my-5 overflow-x-auto rounded-xl">
                                  {children}
                                </pre>
                              ),

                              hr: () => (
                                <hr className="my-6 border-slate-200" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </article>
                    )}
                  </div>
                );
              })}

              {/* Loading */}
              {loading && (
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-semibold text-white">
                    AI
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Input */}
        <div className="sticky bottom-0 bg-slate-50 pt-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-2 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200"
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();

                    if (!loading && input.trim()) {
                      event.currentTarget.form?.requestSubmit();
                    }
                  }
                }}
                placeholder="Message the AI..."
                disabled={loading}
                rows={1}
                className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </form>

          <p className="py-2 text-center text-xs text-slate-400">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </div>
    </main>
  );
}