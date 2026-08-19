import { Router } from "express";
import { sendConversation } from "./ai-conversation.controller.js";

const router = Router();

router.post("/", sendConversation);

export default router;