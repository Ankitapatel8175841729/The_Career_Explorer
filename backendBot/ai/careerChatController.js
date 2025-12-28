import { geminiModel } from "./geminiClient.js";
import { careerSystemPrompt } from "./careerPrompt.js";

export const careerChat = async (req, res) => {
    try {
        const { message } = req.body;
        const prompt = `
        ${careerSystemPrompt}
        Student question:
        "${message}"
        `;

        const result = await geminiModel.generateContent(prompt);
        const response = result.response.text();
        res.json({ reply: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI response failed" });
    }
};