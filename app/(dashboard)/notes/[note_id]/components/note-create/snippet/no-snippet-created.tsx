import { Button } from "@/components/ui/button";
import { createSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";
import NoteCreateHeader from "../note-create-header/note-create-header";
import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { DEFAULT_SNIPPET_CODE, DEFAULT_SNIPPET_DETAIL, DEFAULT_SNIPPET_FILE_NAME, DEFAULT_SNIPPET_LANGUAGE } from "@/lib/constants/default-values"


export default function NoSnippetCreated({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()
    async function handleCreateNote() {
        try{
            const snippetPayload = {
                code: DEFAULT_SNIPPET_CODE,
                detail: DEFAULT_SNIPPET_DETAIL,
                language: DEFAULT_SNIPPET_LANGUAGE,
                file_name: DEFAULT_SNIPPET_FILE_NAME,
                note_id: note.id,
                order: 1,
            }
            snippetStore.addSnippet({
                id: window.crypto.randomUUID(),
                ...snippetPayload,
                created_at: new Date().toISOString()
            })

            await createSnippet({
                ...snippetPayload
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