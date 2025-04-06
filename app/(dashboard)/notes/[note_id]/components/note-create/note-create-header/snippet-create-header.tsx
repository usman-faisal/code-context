
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Tables } from "@/lib/types/database.types";
import { toast } from "sonner";
import { deleteSnippet } from "@/app/actions/snippets";
import { scroll } from "@/lib/utils";
import useSnippetStore from "@/store/snippetStore";

export default function SnippetCreateHeader({ snippet }: { snippet: Tables<'snippets'> }) {
    const snippetStore = useSnippetStore()
    async function handleDeleteSnippet() {
        try {
            snippetStore.deleteSnippet(snippet.id)
            scroll('prev')
            try {
                await deleteSnippet(snippet.id, snippet.note_id)
            } catch (error) {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
            <header className="flex items-center justify-between py-4 px-8">
                <div></div>
                <div className="flex gap-2">
                    <Button onClick={() => handleDeleteSnippet()} variant='destructive'>
                        <TrashIcon className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            </header>
    )
}