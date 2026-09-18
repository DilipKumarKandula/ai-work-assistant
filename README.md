# AI Work Assistant

A practical full-stack AI application built to explore **AI Application Engineering** through real features and end-to-end implementation.

The project combines AI text processing, contextual conversations, document intelligence, and Retrieval-Augmented Generation (RAG) into one workspace.

## Features

### AI Text Intelligence

- Summarize
- Rewrite
- Extract Key Points
- Classify

### AI Conversation

- Context-aware conversations
- Conversation history
- AI-generated responses

### AI Document Intelligence

- Document upload
- PDF processing
- Text extraction
- Document metadata

### AI Knowledge Chat

- Document ingestion
- Text chunking
- Embeddings
- Semantic search
- PostgreSQL + pgvector
- RAG-based answers

## Tech Stack

**Frontend**  
Next.js · React · TypeScript · Tailwind CSS

**Backend**  
Node.js · Express.js · TypeScript

**AI**  
Groq · Hugging Face · Qwen3 Embedding

**Database**  
PostgreSQL · Supabase · pgvector

**Document Processing**  
Multer · PDF text extraction

## Architecture

```text
User
  ↓
Next.js Frontend
  ↓
Express Backend
  ├── AI Text → Groq
  ├── AI Conversation → Groq
  ├── AI Document → Document Processing
  └── Knowledge Chat
        ↓
      Embeddings
        ↓
    PostgreSQL + pgvector
        ↓
      Retrieval
        ↓
      Groq
        ↓
      Answer
```

The main idea is to connect the UI, APIs, backend services, AI models, and data layer into complete working features.

## Project Structure

```text
ai-work-assistant/
├── frontend/
└── backend/
```

The frontend contains the Next.js application and feature UI, while the backend contains API routes, controllers, services, AI integrations, and database access.

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure the required environment variables before running the application.

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Supabase

## API Endpoints

```text
POST /api/ai-text
POST /api/ai-conversation
POST /api/knowledge-chat
```

The document processing API is also provided by the backend under `/api`.

## RAG Overview

The Knowledge Chat feature follows a simple RAG pipeline:

```text
Document
  ↓
Chunking
  ↓
Embedding
  ↓
Vector Storage
  ↓
Semantic Retrieval
  ↓
Context
  ↓
LLM
  ↓
Answer
```

This allows the application to retrieve relevant information from stored document content before generating an answer.

## Project Goal

The goal of this project is not just to build isolated AI demos, but to understand how AI features are integrated into a real application:

```text
Requirement
  ↓
UI
  ↓
API
  ↓
Backend Logic
  ↓
AI / Data Service
  ↓
Result
```

Each major feature was implemented and tested step-by-step so that the architecture and AI concepts could be understood independently.

## Security

Environment variables are used for API keys and database configuration. Secret values should never be committed to GitHub.

## License

Built as a practical AI application demonstrating full-stack development,
AI API integration, document processing, embeddings, vector search, and RAG.

<!-- # AI Work Assistant

A practical AI application built to learn and implement **AI Application Engineering** concepts through real features.

The application combines text intelligence, AI conversation, document intelligence, and Retrieval-Augmented Generation (RAG) into one reusable AI workspace.

---

## 1. Application Overview

The AI Work Assistant currently contains four major AI capabilities:

1. **AI Text Intelligence**
2. **AI Conversation**
3. **AI Document Intelligence**
4. **AI Knowledge Chat (RAG)**

The application is designed around a simple principle:

> Build practical AI features by connecting UI, APIs, backend services, AI models, documents, embeddings, and databases.

---

## 2. Features

### AI Text Intelligence

Provides AI-powered operations on user-provided text:

- Summarize
- Rewrite
- Extract Key Points
- Classify

Flow:

```text
User Text
   ↓
Frontend
   ↓
POST /api/ai-text
   ↓
Backend Validation
   ↓
AI Service
   ↓
Groq LLM
   ↓
AI Result
   ↓
Frontend
```

---

### AI Conversation

Provides a conversational AI interface with conversation context.

The application maintains previous messages and sends them as context to the AI.

Flow:

```text
User Message
   ↓
Chat UI
   ↓
Conversation State
   ↓
Backend API
   ↓
Conversation History
   ↓
Groq LLM
   ↓
AI Response
   ↓
Chat UI
```

Message roles are handled as:

```text
system
user
assistant
```

This allows the application to maintain a multi-turn conversation rather than treating every question as an independent request.

---

### AI Document Intelligence

Allows users to upload documents and extract readable text from them.

The feature handles:

- File selection
- Frontend validation
- Multipart/FormData upload
- Backend file reception
- File validation
- Document processing
- Text extraction
- Document metadata

Flow:

```text
Document
   ↓
Upload UI
   ↓
FormData
   ↓
Backend Upload Route
   ↓
File Validation
   ↓
Document Processing
   ↓
Text Extraction
   ↓
Extracted Text + Metadata
```

The important boundary is:

> Document Intelligence converts an uploaded document into usable text.

That extracted text can then become input for later AI processing or RAG ingestion.

---

### AI Knowledge Chat — RAG

Knowledge Chat implements **Retrieval-Augmented Generation (RAG)**.

Instead of sending the entire document directly to the language model, the application:

1. Splits documents into chunks.
2. Generates embeddings for the chunks.
3. Stores embeddings in PostgreSQL with pgvector.
4. Converts the user's question into an embedding.
5. Performs semantic similarity search.
6. Retrieves the most relevant chunks.
7. Builds context from those chunks.
8. Sends the context and question to the LLM.
9. Generates a grounded answer.

Flow:

```text
DOCUMENT INGESTION

Document
   ↓
Extract Text
   ↓
Chunk Text
   ↓
Generate Embeddings
   ↓
Store Chunks + Embeddings
   ↓
PostgreSQL + pgvector
```

Question flow:

```text
User Question
   ↓
Generate Question Embedding
   ↓
Vector Similarity Search
   ↓
Top-K Relevant Chunks
   ↓
Similarity Threshold
   ↓
Build Context
   ↓
Groq LLM
   ↓
Grounded Answer
```

If relevant information cannot be retrieved, the application avoids generating an answer from unrelated knowledge.

---

# 3. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Markdown
- remark-gfm

## Backend

- Node.js
- Express.js
- TypeScript

## AI

- Groq API
- `openai/gpt-oss-120b`
- Hugging Face Inference
- `Qwen/Qwen3-Embedding-0.6B`

## Database

- Supabase
- PostgreSQL
- pgvector

## Document Processing

- Multer
- PDF text extraction

## Development / Testing

- Postman
- npm scripts
- TypeScript
- Git

---

# 4. High-Level Architecture

```text
                    ┌──────────────────────┐
                    │      Next.js UI      │
                    │                      │
                    │  AI Text             │
                    │  AI Conversation     │
                    │  AI Document         │
                    │  Knowledge Chat       │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │                      │
                    │ Controllers          │
                    │ Routes               │
                    │ Services             │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └─────────────┐
                 ▼                                ▼
        ┌─────────────────┐              ┌─────────────────┐
        │    Groq LLM     │              │   PostgreSQL    │
        │                 │              │    + pgvector   │
        │ AI Generation   │              │                 │
        └─────────────────┘              │ Documents       │
                                         │ Chunks           │
                                         │ Embeddings       │
                                         └────────┬────────┘
                                                  ▲
                                                  │
                                         ┌────────┴────────┐
                                         │ Hugging Face    │
                                         │ Embeddings      │
                                         └─────────────────┘
```

---

# 5. Project Structure

## Backend

```text
backend/
├── src/
│   ├── ai/
│   │   └── groq.ts
│   │
│   ├── config/
│   │   ├── database.ts
│   │   └── database.test.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── ai-text/
│   │   │
│   │   ├── ai-conversation/
│   │   │
│   │   ├── ai-document/
│   │   │
│   │   └── knowledge-chat/
│   │       ├── controllers/
│   │       │   └── knowledge-chat.controller.ts
│   │       │
│   │       ├── routes/
│   │       │   └── knowledge-chat.routes.ts
│   │       │
│   │       └── services/
│   │           ├── chunking.service.ts
│   │           ├── chunking.test.ts
│   │           ├── embedding.service.ts
│   │           ├── embedding.test.ts
│   │           ├── document-embedding.service.ts
│   │           ├── document-embedding.test.ts
│   │           ├── vector-storage.test.ts
│   │           ├── vector-search.test.ts
│   │           ├── retrieval.service.ts
│   │           ├── retrieval.test.ts
│   │           ├── context.service.ts
│   │           ├── context.test.ts
│   │           ├── rag.service.ts
│   │           ├── rag.test.ts
│   │           ├── ingestion.service.ts
│   │           ├── ingestion.test.ts
│   │           ├── ingestion-check.test.ts
│   │           └── document-rag-ingestion.test.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── .env
```

## Frontend

```text
frontend/
├── src/
│   ├── app/
│   │   ├── ai-text/
│   │   ├── ai-conversation/
│   │   ├── ai-document/
│   │   └── knowledge-chat/
│   │       └── page.tsx
│   │
│   └── features/
│       ├── ai-text/
│       ├── ai-conversation/
│       ├── document-intelligence/
│       └── knowledge-chat/
│           └── services/
│               └── knowledge-chat.service.ts
│
└── .env.local
```

---

# 6. Backend Responsibilities

## `src/ai/groq.ts`

Creates and exports the Groq client.

Responsibilities:

- Read `GROQ_API_KEY`
- Initialize Groq SDK
- Provide a reusable AI client

---

## `src/config/database.ts`

Creates the PostgreSQL connection pool.

Responsibilities:

- Read `DATABASE_URL`
- Create PostgreSQL connection pool
- Provide database access to backend services

---

## AI Text Module

Responsible for text-based AI operations.

```text
Route
  ↓
Controller
  ↓
Validation
  ↓
AI Service
  ↓
Groq
```

---

## AI Conversation Module

Responsible for multi-turn AI conversations.

It manages:

- User messages
- Assistant messages
- Conversation history
- Message roles
- AI context

---

## AI Document Module

Responsible for:

- Uploading files
- Validating files
- Processing documents
- Extracting text
- Returning document information

---

## Knowledge Chat Module

This is the RAG layer.

### `chunking.service.ts`

Splits extracted document text into smaller chunks.

```text
Large Document
      ↓
Chunk 1
Chunk 2
Chunk 3
...
```

---

### `embedding.service.ts`

Converts text into numerical vectors.

```text
Text
 ↓
Embedding Model
 ↓
Vector
```

Current embedding model:

```text
Qwen/Qwen3-Embedding-0.6B
```

---

### `document-embedding.service.ts`

Connects chunking and embedding generation.

```text
Document Text
      ↓
Chunking
      ↓
Chunks
      ↓
Embedding Generation
      ↓
Chunk + Vector
```

---

### `ingestion.service.ts`

Coordinates the document ingestion process.

```text
Document
   ↓
Store Document
   ↓
Extract Text
   ↓
Chunk
   ↓
Generate Embeddings
   ↓
Store Chunks
```

---

### `retrieval.service.ts`

Handles semantic search.

```text
Question
   ↓
Question Embedding
   ↓
Vector Search
   ↓
Similarity Calculation
   ↓
Top-K Results
```

It uses pgvector similarity search.

---

### `context.service.ts`

Converts retrieved chunks into a context string for the language model.

Example:

```text
[Source 1]
Relevant document content...

[Source 2]
Another relevant document section...
```

---

### `rag.service.ts`

Coordinates the final RAG pipeline.

```text
Question
   ↓
Retrieval
   ↓
Context Construction
   ↓
LLM Prompt
   ↓
Groq
   ↓
Answer
```

It also handles the case where no relevant chunks are found.

---

# 7. Database Design

The application currently uses two main tables.

## `documents`

```sql
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    file_type TEXT,
    file_size BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Stores document-level information.

---

## `document_chunks`

```sql
CREATE TABLE document_chunks (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL
        REFERENCES documents(id)
        ON DELETE CASCADE,

    chunk_index INTEGER NOT NULL,

    content TEXT NOT NULL,

    embedding VECTOR(1024) NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Stores:

- Document relationship
- Chunk order
- Chunk content
- Embedding vector

---

# 8. RAG Data Relationship

```text
documents
    │
    │ 1
    │
    │
    │ many
    ▼
document_chunks
    │
    ├── content
    ├── chunk_index
    └── embedding
```

One document can contain many chunks.

Each chunk has its own embedding.

---

# 9. API Endpoints

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "ai-work-assistant"
}
```

---

## AI Text

```http
POST /api/ai-text
```

Used for AI text operations such as:

```text
summarize
rewrite
key points
classify
```

---

## AI Conversation

```http
POST /api/ai-conversation
```

Used for conversational AI.

---

## AI Document

The document module is mounted under:

```http
/api
```

and provides the document processing/upload functionality.

---

## Knowledge Chat

```http
POST /api/knowledge-chat
```

Request:

```json
{
  "question": "What can teachers do in the learning management system?"
}
```

Response:

```json
{
  "question": "What can teachers do in the learning management system?",
  "answer": "Teachers can create courses and manage learning content."
}
```

---

# 10. Environment Variables

Backend `.env`:

```env
GROQ_API_KEY=your_groq_api_key
HF_TOKEN=your_huggingface_token
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Frontend `.env.local` should contain the backend API base URL used by the frontend service.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Never commit secret values to Git.

---

# 11. Running the Application

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the Next.js application in the browser.

---

# 12. Development and Testing Approach

The application was developed incrementally.

Each major AI concept was implemented and tested separately before connecting it to the next layer.

### AI Text

```text
UI
 ↓
API
 ↓
Backend
 ↓
Groq
```

### AI Conversation

```text
UI
 ↓
Conversation State
 ↓
API
 ↓
History
 ↓
Groq
```

### AI Document

```text
Upload
 ↓
Validation
 ↓
Backend
 ↓
Processing
 ↓
Text Extraction
```

### RAG

```text
Chunking
 ↓
Embedding
 ↓
Vector Storage
 ↓
Vector Search
 ↓
Retrieval
 ↓
Context
 ↓
LLM
```

This approach makes debugging easier because each layer can be tested independently.

---

# 13. RAG Test Scripts

The Knowledge Chat module contains focused test scripts for individual stages.

Examples:

```bash
npm run chunk-test
```

```bash
npm run embedding-test
```

```bash
npm run document-embedding-test
```

```bash
npm run vector-storage-test
```

```bash
npm run retrieval-test
```

```bash
npm run context-test
```

```bash
npm run rag-test
```

```bash
npm run ingestion-test
```

```bash
npm run ingestion-check
```

```bash
npm run document-rag-ingestion-test
```

These tests help verify each RAG layer independently.

---

# 14. Complete Application Flow

The four capabilities are connected conceptually but remain separate modules.

```text
                    AI WORK ASSISTANT
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      AI TEXT       AI CONVERSATION   AI DOCUMENT
          │                │                │
          │                │                ▼
          │                │           Extracted Text
          │                │                │
          │                │                ▼
          │                │             RAG
          │                │                │
          │                │       ┌────────┴────────┐
          │                │       ▼                 ▼
          │                │   Embeddings       Retrieval
          │                │       │                 │
          │                │       └────────┬────────┘
          │                │                ▼
          │                │             Context
          │                │                │
          └────────────────┴────────────────┤
                                           ▼
                                      Groq LLM
                                           │
                                           ▼
                                       AI Response
```

---

# 15. What Was Learned

The project covers practical AI Application Engineering concepts:

### AI API Integration

- Calling LLM APIs
- Managing API keys
- Request/response handling
- Error handling
- Timeouts

### Prompting

- System instructions
- User prompts
- Context injection
- Grounded responses

### Conversation Context

- Message history
- Message roles
- Multi-turn context

### Document Intelligence

- File upload
- FormData
- File validation
- Text extraction
- Document metadata

### Embeddings

- Text-to-vector conversion
- Embedding dimensions
- Document embeddings
- Query embeddings

### Vector Databases

- PostgreSQL
- pgvector
- Vector storage
- Similarity search

### Retrieval

- Semantic search
- Top-K retrieval
- Similarity scores
- Similarity thresholds

### RAG

- Retrieval before generation
- Context construction
- Grounded generation
- Handling missing information

---

# 16. Current Limitations

The current implementation is intentionally focused on learning the core architecture.

Some production features are not yet included:

- Authentication
- Authorization
- Multi-user document isolation
- Advanced chunking strategies
- Source citations in the UI
- Streaming responses
- Background ingestion jobs
- Queue-based processing
- Production observability
- Rate limiting
- Advanced document formats
- Production deployment hardening

These can be added in later stages.

---

# 17. Current Project Boundary

The application currently focuses on:

```text
AI Text
    ↓
AI Conversation
    ↓
AI Document
    ↓
RAG / Knowledge Chat
```

The next major capability is:

```text
AI Tools & Workflows
```

This will extend the application from:

```text
AI that generates responses
```

toward:

```text
AI that can decide when to use tools
and execute application actions.
```

---

# 18. Engineering Principle

The project is not intended to be just a collection of AI demos.

The goal is to understand how a real AI application is constructed:

```text
Requirement
    ↓
UI
    ↓
API
    ↓
Backend Logic
    ↓
AI / Data Service
    ↓
Database / External System
    ↓
Result
    ↓
UI
```

For AI-specific features, the architecture additionally considers:

```text
Prompt
Context
Model
Retrieval
Tools
Validation
Errors
Cost
Latency
Security
```

The project is developed feature-by-feature so that each layer can be understood, implemented, tested, and reused in future applications.

---

## License

This project is intended for learning, experimentation, and portfolio development. -->
