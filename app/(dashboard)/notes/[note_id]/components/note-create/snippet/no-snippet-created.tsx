import { Button } from "@/components/ui/button";
import { createSnippet } from "@/utils/api/snippets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import NoteCreateHeader from "../note-create-header/note-create-header";
import { Tables } from "@/lib/types/database.types";

export default function NoSnippetCreated({ note }: { note: Tables<'notes'> }) {
    const queryClient = useQueryClient()

    const {mutateAsync: createSnippetMutation} = useMutation({
        mutationFn: () => createSnippet(note.id, `console.log('hello')`, `# This is a snippet`, 1),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets', note.id] })
        }
    })
    async function handleCreateNote() {
        try{
            await createSnippetMutation()
            toast.success('Snippet created')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message ?? 'Something went wrong')
            } else {
                toast.error('Something went wrong')
            }
        }
    }
    return (
        <div className="min-h-screen max-h-screen relative">
            <NoteCreateHeader note={note} />
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <h1 className="text-4xl font-bold">Hey👋 Get Started by creating a snippet.</h1>
                <Button className="text-2xl" onClick={handleCreateNote}>
                    Create Snippet
                </Button>
            </div>
        </div>
    )
}