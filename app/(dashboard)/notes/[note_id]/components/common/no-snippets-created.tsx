import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { handleSnippetCreation } from "@/lib/utils";
import NoteCreateHeader from "../note-create/note-create-header/note-create-header";
import ViewNoteHeader from "../view-note/snippet/view-note-header";

export default function NoSnippetsCreated({ note, isViewNote }: { note: Tables<'notes'>, isViewNote: boolean }) {
    const snippetStore = useSnippetStore()

    return (
        <div className="min-h-screen max-h-screen relative">
            {isViewNote ? <ViewNoteHeader note={note} /> : <NoteCreateHeader note={note} />}
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                {isViewNote ? (
                    <h1 className="text-4xl font-bold">No snippets created</h1>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold">Hey👋 Get Started by creating a snippet.</h1>
                        <Button className="text-2xl" onClick={() => handleSnippetCreation(true, note, snippetStore)}>
                            Create Snippet
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}