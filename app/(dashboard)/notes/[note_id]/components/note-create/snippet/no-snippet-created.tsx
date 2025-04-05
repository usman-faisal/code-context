import { Button } from "@/components/ui/button";
import { createSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";
import NoteCreateHeader from "../note-create-header/note-create-header";
import { Tables } from "@/lib/types/database.types";

export default function NoSnippetCreated({ note }: { note: Tables<'notes'> }) {
    async function handleCreateNote() {
        try{
            await createSnippet({
                code: `console.log('hello')`,
                detail: `# This is a snippet`,
                note_id: note.id,
                order: 1
            })
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