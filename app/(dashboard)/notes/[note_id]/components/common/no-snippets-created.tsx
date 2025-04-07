import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { handleSnippetCreation } from "@/lib/utils";
import NoteCreateHeader from "../note-create/note-create-header/note-create-header";
import ViewNoteHeader from "../view-note/snippet/view-note-header";
import Sidebar from "../note-create/note-create-header/sidebar";
import { Menu } from "lucide-react";
import useSidebarStore from "@/store/sidebarStore";
export default function NoSnippetsCreated({ note, isViewNote }: { note: Tables<'notes'>, isViewNote: boolean }) {
    const snippetStore = useSnippetStore();
    const sidebarStore = useSidebarStore();
    
    const openSidebar = () => sidebarStore.setIsOpen(true);

    return (
        <div className="min-h-screen max-h-screen relative">
            <Sidebar note={note} />
            
            <div className="w-full">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2" onClick={openSidebar}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    {isViewNote ? <ViewNoteHeader index={0} note={note} /> : <NoteCreateHeader note={note} />}
                </div>
                
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