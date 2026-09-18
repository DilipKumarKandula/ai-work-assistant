import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import aiTextRouter from "./modules/ai-text/ai-text.routes.js";
import aiConversationRouter from "./modules/ai-conversation/ai-conversation.routes.js";
import aiDocumentRoute from "./modules/ai-document/ai-document.route.js";
import knowledgeChatRoutes from "./modules/knowledge-chat/routes/knowledge-chat.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ai-work-assistant",
  });
});

app.use("/api/ai-text", aiTextRouter);

app.use("/api/ai-conversation", aiConversationRouter);

app.use("/api", aiDocumentRoute);

app.use("/api/knowledge-chat", knowledgeChatRoutes);

export default app;