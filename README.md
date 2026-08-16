# AI Work Assistant

A production-oriented full-stack AI application built using modern web technologies and AI services.

This project focuses on building practical AI-powered capabilities with a dedicated frontend, backend API, and third-party AI integrations.

---

# Current Feature

## AI Text Intelligence

AI Text Intelligence allows users to analyze and transform text using AI.

Supported operations:

- Summarization
- Rewriting
- Key point extraction
- Text classification

The feature includes frontend and backend validation, REST API communication, AI prompt construction, loading states, error handling, request timeout handling, and secure server-side AI API integration.

---

# System Architecture

```text
Frontend (Next.js)
        ↓
Backend API (Node.js / Express)
        ↓
AI Service
        ↓
Groq API
        ↓
Llama Model
```

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript

## AI

- Groq API
- Llama Models

---

# Engineering Practices

- Frontend & Backend separation
- REST API architecture
- Client-side & server-side validation
- Service-based backend structure
- Third-party API integration
- Secure environment variable management
- Loading and error handling
- Request timeout handling
- Asynchronous API processing

---

# Environment Configuration

## Backend

Create a `.env` file:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

API keys and sensitive configuration must not be committed to the repository.

---

# Local Development

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Project Status

The application is actively under development, with new AI capabilities being added as the product evolves.

---

# Author

Dilip Kumar

```

This matches the **style and level of your Task Manager README** much better: technical and portfolio-ready, while keeping the detailed implementation/process documentation separate.
```
