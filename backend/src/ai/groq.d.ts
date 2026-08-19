import "dotenv/config";
export declare function generateText(prompt: string): Promise<string>;
type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};
export declare function generateChat(messages: ChatMessage[]): Promise<string>;
export {};
//# sourceMappingURL=groq.d.ts.map