// app/api/generate-details/route.ts
import { NextResponse } from 'next/server';
import { generateCodeDetails } from '@/lib/gemini/geminiService'; // Adjust path if needed

type RequestData = {
    code: string;
    userPrompt?: string;
    apiKey?: string; // <-- Add optional apiKey field
};

export async function POST(request: Request) {
    console.log("API Route: Generating code details request received.");
    try {
        const { code, userPrompt, apiKey: userApiKey } = (await request.json()) as RequestData;

        if (!code) {
            return NextResponse.json({ error: 'Code snippet is required.' }, { status: 400 });
        }

        // --- Determine which API key to use ---
        const defaultApiKey = process.env.GOOGLE_API_KEY;
        const keyToUse = userApiKey || defaultApiKey;

        if (!keyToUse) {
            console.error("API Route Error: No API key provided by user and GOOGLE_API_KEY environment variable is not set.");
            return NextResponse.json(
                { error: 'API Key is missing. Please provide your own key or configure the default server key.' },
                { status: 400 } // Bad Request - missing required configuration/input
            );
        }
        // --- End Key Selection ---

        // --- Define your System Prompt Here (can remain the same) ---
        const systemPrompt = `You are an expert AI assistant specialized in explaining code...`;
        // --- End System Prompt Definition ---

        console.log(`API Route: Calling generateCodeDetails. Using ${userApiKey ? 'user-provided key' : 'default key'}.`);

        const markdownDetails = await generateCodeDetails(
            keyToUse, // <-- Pass the selected key
            systemPrompt,
            code,
            userPrompt
        );

        console.log("API Route: Successfully generated details.");
        return NextResponse.json({ details: markdownDetails }, { status: 200 });

    } catch (error: any) {
        console.error('API Route Error:', error);
        // Return a more specific error if it's the custom API key error
        if (error.message.includes('Invalid API Key provided')) {
             return NextResponse.json(
                { error: 'Invalid API Key provided. Please check your key and try again.' },
                { status: 401 } // Unauthorized
            );
        }
        return NextResponse.json(
            { error: error.message || 'Failed to generate code details.' },
            { status: 500 }
        );
    }
}

export async function GET() {
     return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}