// lib/gemini/geminiService.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

// No longer checking for the default key here, as the check will happen in the API route
// if (!process.env.GOOGLE_API_KEY) {
//     throw new Error("GOOGLE_API_KEY environment variable is not set for default usage.");
// }

// Remove module-level chatModel instance

const outputParser = new StringOutputParser();

export async function generateCodeDetails(
    apiKey: string, // <-- Add apiKey parameter
    systemPrompt: string,
    code: string,
    userPrompt?: string
): Promise<string> {
    try {
        // --- Initialize the client inside the function with the provided key ---
        const chatModel = new ChatGoogleGenerativeAI({
            apiKey: apiKey, // Use the passed apiKey
            model: process.env.GOOGLE_MODEL || 'gemini-pro', // Fallback model if not set
            maxOutputTokens: 2048,
            temperature: 0.7,
        });
        // --- End Client Initialization ---

        console.log("Generating code details with Gemini...");
        console.log("System Prompt:", systemPrompt);
        console.log("User Prompt:", userPrompt || "N/A");
        // It's generally good practice *not* to log the API key itself
        // console.log("Using API Key ending with:", apiKey.slice(-4)); // Optional: log last 4 chars for debugging

        const promptTemplate = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(systemPrompt),
            HumanMessagePromptTemplate.fromTemplate(`
                User Instructions: {userInstructions}

                Code to explain:
                \`\`\`
                {code}
                \`\`\`
            `),
        ]);

        const chain = RunnableSequence.from([
            promptTemplate,
            chatModel,
            outputParser,
        ]);

        const userInstructions = userPrompt
            ? userPrompt
            : "Explain the provided code snippet.";

        const result = await chain.invoke({
            code: code,
            userInstructions: userInstructions,
        });

        console.log("Gemini generation successful.");
        return result;

    } catch (error) {
        console.error("Error generating code details with Gemini:", error);
        // Improve error message for API key issues
        if (error instanceof Error) {
             if (error.message.includes('API key not valid')) {
                 throw new Error(`Gemini API Error: Invalid API Key provided.`);
             }
            throw new Error(`Gemini API Error: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred during Gemini generation.");
        }
    }
}

// Example Usage (needs modification if you want to test directly)
/*
async function test() {
    const system = "You are an expert code documenter...";
    const codeSnippet = `...`;
    const userInstruction = "Keep it simple.";
    // You'd need to provide a key here for testing
    const testApiKey = process.env.GOOGLE_API_KEY || "YOUR_TEST_KEY_HERE"; // Or a specific test key

    if (!testApiKey) {
        console.error("Cannot run test: No GOOGLE_API_KEY in .env and no explicit test key provided.");
        return;
    }

    try {
        const markdownDetails = await generateCodeDetails(testApiKey, system, codeSnippet, userInstruction);
        console.log("\n--- Generated Markdown ---");
        console.log(markdownDetails);
        console.log("------------------------\n");
    } catch (e) {
        console.error("Test failed:", e);
    }
}

// test();
*/