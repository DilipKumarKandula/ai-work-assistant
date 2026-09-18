import { Router } from "express";

import {
  askKnowledgeChat,
  addKnowledge,
} from "../controllers/knowledge-chat.controller.js";

const router = Router();

router.post("/", askKnowledgeChat);

router.post("/ingest", addKnowledge);

export default router;