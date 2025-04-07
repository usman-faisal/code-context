import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Tables } from "@/lib/types/database.types";
import { toast } from "sonner";
import { deleteSnippet } from "@/app/actions/snippets";
import { scroll } from "@/lib/utils";
import useSnippetStore from "@/store/snippetStore";
import useSidebarStore from "@/store/sidebarStore"; 
import { Menu } from "lucide-react";

export default function SnippetCreateHeader({ snippet }: { snippet: Tables<'snippets'> }) {
    const snippetStore = useSnippetStore()
    const sidebarStore = useSidebarStore()
    async function handleDeleteSnippet() {
        try {
            scroll('prev')
            snippetStore.deleteSnippet(snippet.id)
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
        <div className="flex-1">
            <header className="note-header pl-0">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => sidebarStore.setIsOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h3 className="text-xl font-medium">{snippet.file_name || 'Untitled Snippet'}</h3>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleDeleteSnippet()} variant='destructive'>
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </header>
        </div>
    )
}