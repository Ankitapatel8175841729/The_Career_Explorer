import express from "express";
import { careerChat } from "../ai/careerChatController.js";

const router = express.Router();

router.post("/career-chat", careerChat);

export default router;