import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { handleSnippetCreation } from "@/lib/utils";
import NoteCreateHeader from "../note-create/note-create-header/note-create-header";
import ViewNoteHeader from "../view-note/snippet/view-note-header";
import Sidebar from "../note-create/note-create-header/sidebar";
export default function NoSnippetsCreated({ note, isViewNote }: { note: Tables<'notes'>, isViewNote: boolean }) {
    const snippetStore = useSnippetStore();

    return (
        <div className="min-h-screen max-h-screen relative">
            <Sidebar note={note} />
            
            <div className="w-full">
                {isViewNote ? <ViewNoteHeader index={0} note={note} /> : <NoteCreateHeader note={note} />}
                <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-5rem)]">
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
        </div>
    );
}