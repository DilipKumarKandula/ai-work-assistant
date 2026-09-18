import Link from "next/link";

const features = [
  {
    title: "AI Text Intelligence",
    short: "TEXT",
    description:
      "Turn raw text into useful output with AI-powered summarization, rewriting, extraction, and classification.",
    capabilities: ["Summarize", "Rewrite", "Extract", "Classify"],
    href: "/aitext",
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    title: "AI Conversation",
    short: "CHAT",
    description:
      "Have contextual conversations with message history and AI-generated responses.",
    capabilities: ["Context", "History", "Responses"],
    href: "/aiconversation",
    accent: "from-cyan-500/30 via-blue-500/10 to-transparent",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    title: "AI Document Intelligence",
    short: "DOCS",
    description:
      "Process documents, extract readable text, and prepare content for AI workflows.",
    capabilities: ["PDF", "Extraction", "Analysis"],
    href: "/aidocuments",
    accent: "from-emerald-500/30 via-teal-500/10 to-transparent",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    title: "Knowledge Chat",
    short: "RAG",
    description:
      "Ask questions against your own knowledge using embeddings, vector search, retrieval, and generation.",
    capabilities: [
      "Embeddings",
      "Vector Search",
      "Retrieval",
      "RAG",
    ],
    href: "/knowledge-chat",
    accent: "from-orange-500/30 via-pink-500/10 to-transparent",
    glow: "group-hover:shadow-orange-500/10",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden rounded-[28px] bg-[#07070b] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-24">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-[0.18em] text-white/60 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              AI APPLICATION ENGINEERING
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              AI Workspace
            
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              A practical AI application for working with text,
              conversations, documents, and your own knowledge.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {/* <Link
                href="/aitext"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-white/90"
              >
                Explore AI Workspace
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link> */}

              <a
                href="https://github.com/DilipKumarKandula/ai-work-assistant"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-white"
              >
                View GitHub
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Hero visual */}
          {/* <div className="mt-16 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
            <div className="rounded-[22px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm font-medium text-white/90">
                    AI Workspace
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    One application · Multiple AI capabilities
                  </p>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="grid gap-3 pt-5 sm:grid-cols-4">
                {[
                  "Text",
                  "Conversation",
                  "Documents",
                  "Knowledge",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-white/35">
                        0{index + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                        AI
                      </span>
                    </div>

                    <p className="text-sm font-medium text-white/80">
                      {item}
                    </p>

                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={[
                          "h-full rounded-full",
                          index === 0
                            ? "w-4/5 bg-violet-400/70"
                            : index === 1
                              ? "w-3/5 bg-cyan-400/70"
                              : index === 2
                                ? "w-2/3 bg-emerald-400/70"
                                : "w-full bg-orange-400/70",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                Capabilities
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                AI tools built into one workspace
              </h2>
            </div>

            <p className="hidden max-w-sm text-right text-sm leading-6 text-white/35 md:block">
              Explore each capability and see how the individual AI
              systems work.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-2xl ${feature.glow}`}
              >
                {/* Card gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 ${feature.accent}`}
                />

                {/* Top glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl transition duration-300 group-hover:bg-white/[0.08]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-xs font-semibold tracking-[0.12em] text-white/65 backdrop-blur-xl">
                      {feature.short}
                    </div>

                    <span className="text-xl text-white/25 transition duration-300 group-hover:translate-x-1 group-hover:text-white/70">
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
                    {feature.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {feature.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-lg border border-white/10 bg-black/15 px-3 py-1.5 text-xs text-white/50"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm font-medium text-white/75">
                      Open feature
                    </span>

                    <span className="text-xs text-white/30">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
            <div className="p-7 sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                How it works
              </p>

              <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  From user input to useful AI output.
                </h2>

                <p className="max-w-md text-sm leading-6 text-white/35">
                  Different AI capabilities share the same application
                  architecture while solving different problems.
                </p>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Input",
                    text: "Text, messages, documents, or knowledge.",
                  },
                  {
                    step: "02",
                    title: "Processing",
                    text: "Validation, extraction, chunking, and data handling.",
                  },
                  {
                    step: "03",
                    title: "AI",
                    text: "LLM generation, embeddings, and retrieval.",
                  },
                  {
                    step: "04",
                    title: "Result",
                    text: "A useful response returned to the application.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-[#0b0b10] p-6 transition hover:bg-[#101017]"
                  >
                    <p className="text-xs font-medium text-white/25">
                      {item.step}
                    </p>

                    <h3 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mx-auto max-w-6xl px-6 pb-24 text-center sm:px-8 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
            Technology
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built with an AI-ready full-stack architecture
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express",
              "PostgreSQL",
              "pgvector",
              "Groq",
              "Hugging Face",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm text-white/55 backdrop-blur-xl transition hover:border-white/20 hover:text-white/80"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-xs text-white/25">
              AI Work Assistant · Built as a practical AI
              application engineering project
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}