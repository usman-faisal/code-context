
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Tables } from "@/lib/types/database.types";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSnippet } from "@/utils/api/snippets";
import { scroll } from "@/lib/utils";
export default function SnippetCreateHeader({ snippet }: { snippet: Tables<'snippets'> }) {
    const queryClient = useQueryClient()
    const {mutateAsync: deleteSnippetMutation} = useMutation({
        mutationFn: () => deleteSnippet(snippet.id, snippet.note_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets', snippet.note_id] })
        },
        onError: () => {
            toast.error('Something went wrong')
        }
    })
    async function handleDeleteSnippet() {
        try {
            scroll('prev')
            await deleteSnippetMutation()
            toast.success('Snippet deleted')
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