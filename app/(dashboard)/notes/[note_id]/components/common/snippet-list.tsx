'use client'
import useSnippetStore from "@/store/snippetStore"
import NoteCreateHeader from "../note-create/note-create-header/note-create-header"
import SnippetCreateHeader from "../note-create/note-create-header/snippet-create-header"
import { Tables } from "@/lib/types/database.types"
import ViewNoteHeader from "../view-note/snippet/view-note-header"
import SnippetCodeInput from "./snippet-code-input"
import SnippetDetailInput from "./snippet-detail-input"
import SnippetFooter from "./snippet-footer"
import { handleSnippetCreation, scroll } from "@/lib/utils"
import Sidebar from "../note-create/note-create-header/sidebar"

function RenderNoteCreateHeader({ index, snippet, note }: { index: number, snippet: Tables<'snippets'>, note: Tables<'notes'> }): React.ReactNode {
    return index !== 0 ? <SnippetCreateHeader snippet={snippet} /> : <NoteCreateHeader note={note} />
}

export default function SnippetList({ note, isViewNote }: { note: Tables<'notes'>, isViewNote: boolean }) {
    const snippetStore = useSnippetStore()
    
    function handleAddSnippet() {
        scroll('next')
        handleSnippetCreation(true, note, snippetStore)
    }

    
    return (
        <>
            <Sidebar note={note}  />
            
            <div className="w-full">
                {snippetStore.snippets.map((snippet, index) => {
                    return (
                        <div 
                            key={snippet.id} 
                            className="min-h-screen max-h-screen relative"
                            data-snippet-id={snippet.id}
                        >
                            {isViewNote ? (
                                    <ViewNoteHeader index={index} note={note} />
                            ) : (
                                <RenderNoteCreateHeader 
                                    index={index} 
                                    snippet={snippet} 
                                    note={note}
                                />
                            )}
                            <main className="px-8 grid grid-cols-1 grid-rows-[1fr_1fr] md:grid-cols-2 gap-4 h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]">
                                <SnippetCodeInput isReadonly={isViewNote ? true : false} snippet={snippet} />
                                <SnippetDetailInput isReadonly={isViewNote ? true : false} snippet={snippet} />
                            </main>
                            <SnippetFooter showAddSnippet={isViewNote ? false : true} handleAddSnippet={handleAddSnippet} index={index} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}