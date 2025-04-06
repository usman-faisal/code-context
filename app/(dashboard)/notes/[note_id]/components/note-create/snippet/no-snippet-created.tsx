import { Button } from "@/components/ui/button";
import NoteCreateHeader from "../note-create-header/note-create-header";
import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { handleSnippetCreation } from "@/lib/utils";


export default function NoSnippetCreated({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()

    return (
        <div className="min-h-screen max-h-screen relative">
            <NoteCreateHeader note={note} />
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <h1 className="text-4xl font-bold">Hey👋 Get Started by creating a snippet.</h1>
                <Button className="text-2xl" onClick={() => handleSnippetCreation(true, note, snippetStore)}>
                    Create Snippet
                </Button>
            </div>
        </div>
    )
}