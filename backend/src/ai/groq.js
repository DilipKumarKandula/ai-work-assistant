import "dotenv/config";
import Groq from "groq-sdk";
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
export async function generateText(prompt) {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return response.choices[0]?.message?.content ?? "";
}
export async function generateChat(messages) {
    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages,
    });
    return response.choices[0]?.message?.content ?? "";
}
//# sourceMappingURL=groq.js.map