import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import aiTextRouter from "./modules/ai-text/ai-text.routes.js";

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

export default app;