import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Tables } from "@/lib/types/database.types";
import { useState } from "react"
import useSnippetStore from "@/store/snippetStore"
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { updateSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";

export default function GenerateDetailsWithAIButton({ snippet }: { snippet: Tables<'snippets'> }) {
    const snippetStore = useSnippetStore()
    const [open, setOpen] = useState(false);
    const [customPrompt, setCustomPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    function getApiKey() {
        const apiKey = localStorage.getItem("gemini_api_key")
        if (!apiKey || typeof apiKey !== "string") {
            return null
        }
        return apiKey
    }
    async function handleGenerateDetailsWithAI() {
        setIsLoading(true);
        try {
            const apiKey = getApiKey()
            if (!apiKey) {
                setIsLoading(false);
                toast.error("No API key found. Please set your API key in the settings.", {position: 'bottom-center'});
                return;
            }
            const response = await fetch("/api/generate-details", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: snippet.code, customPrompt: customPrompt || undefined, apiKey: apiKey }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("API Error:", response.status, errorData);
                toast.error(`Error generating details: ${response.status} ${errorData || response.statusText}`, {position: 'bottom-center'});
                setIsLoading(false);
                return; 
            }

            const data = await response.json();

            if (data.details) {
                 snippetStore.updateSnippet(snippet.id, {
                    ...snippet,
                    detail: data.details
                 });
                 updateSnippet({
                    id: snippet.id,
                    detail: data.details
                 }, true)
                 setOpen(false);
            } else {
                console.error("API response missing 'details':", data);
                toast.error("Received response from AI, but it didn't contain the expected details.", {position: 'bottom-center'});
            }

        } catch (error) {
            console.error("Failed to fetch or process AI details:", error);
            toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`, {position: 'bottom-center'});
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="sm">
                    <Wand2 className="w-4 h-4 mr-2" /> {/* Added margin */}
                    Generate with AI
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate details with AI</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Optional: Add specific instructions for the AI (e.g., 'Explain this like I'm 5', 'Focus on the performance aspects')"
                    />
                     <p className="text-sm text-muted-foreground pt-2">
                        The AI will analyze the code snippet. Add custom instructions above if needed.
                    </p>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleGenerateDetailsWithAI}
                        disabled={isLoading}
                    >
                        {isLoading ? "Generating..." : "Generate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}