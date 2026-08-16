import {Router} from "express";
import { aiTextController } from "./ai-text.controller.js";

const router= Router();

router.post("/", aiTextController);

export default router;