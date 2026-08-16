"use client";

import { useState } from "react";
import { analyzeText } from "./ai-text.service";

export default function AItext() {
  const [textInput, setTextInput] = useState("");
  const [operation, setOperation] = useState("Summarize");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading]=useState(false);


  async function handleAnalyze() {
    if (!textInput.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {

      setLoading(true);
      const response = await analyzeText(
        textInput,
        operation
      );
      if (!response.success || !response.result) {
      setError("We couldn't generate a response. Please try again.");
      return;
      }

      setResult(response.result);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }finally{
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
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          AI Text Intelligence
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Analyze and transform your text using AI.
        </p>
      </div>

      {/* Input Section */}
      <div className="p-5">
        <div className="space-y-5">
          {/* Text Input */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Text
            </label>

            <textarea
              value={textInput}
              onChange={handleOnChange}
              placeholder="Enter or paste your text here..."
              rows={10}
              className="w-full resize-y rounded-md border p-3 text-sm outline-none focus:ring-2"
            />

            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{textInput.length} characters</span>

              <span>
                Enter the content you want AI to analyze
              </span>
            </div>
          </div>

          {/* Operation */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Operation
            </label>

            <select
              value={operation}
              onChange={handleOperationChange}
              className="w-full rounded-md border p-3 text-sm outline-none focus:ring-2"
            >
              <option value="Summarize">Summarize</option>

              <option value="Rewrite">Rewrite</option>

              <option value="Extract Key Points">
                Extract Key Points
              </option>

              <option value="Classify">
                Classify
              </option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Action */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="p-5">
        <h3 className="text-lg font-medium">
          Result
        </h3>

        <div className="mt-4 min-h-32 rounded-md border p-4 text-sm">
          {result || "Your AI result will appear here."}
        </div>
      </div>
    </div>
  );
}