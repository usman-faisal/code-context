'use client'
import useSnippetStore from "@/store/snippetStore"
import NoteCreateHeader from "../note-create/note-create-header/note-create-header"
import SnippetCreateHeader from "../note-create/note-create-header/snippet-create-header"
import { Tables } from "@/lib/types/database.types"
import ViewNoteHeader from "../view-note/snippet/view-note-header"
import SnippetListWrapper from "./snippet-list-wrapper"
import SnippetCodeInput from "./snippet-code-input"
import SnippetDetailInput from "./snippet-detail-input"
import SnippetFooter from "./snippet-footer"
import { handleSnippetCreation, scroll } from "@/lib/utils"

function RenderNoteCreateHeader({ index, snippet, note }: { index: number, snippet: Tables<'snippets'>, note: Tables<'notes'> }): React.ReactNode {
    return index !== 0 ?   <SnippetCreateHeader snippet={snippet} /> : <NoteCreateHeader note={note} />
}

export default function SnippetList({ note, isViewNote }: { note: Tables<'notes'>, isViewNote: boolean }) {
    const snippetStore = useSnippetStore()
    function handleAddSnippet() {
        scroll('next')
        handleSnippetCreation(true, note, snippetStore)
    }
    return (
        <>
            {snippetStore.snippets.map((snippet, index) => {
                return (
                    <div key={snippet.id} className="md:min-h-screen md:max-h-screen relative">
                        {isViewNote ? <ViewNoteHeader note={note} /> : <RenderNoteCreateHeader index={index} snippet={snippet} note={note} />}
                        <SnippetListWrapper>
                            <SnippetCodeInput isReadonly={isViewNote ? true : false} snippet={snippet} />
                            <SnippetDetailInput isReadonly={isViewNote ? true : false} snippet={snippet} />
                        </SnippetListWrapper>
                        <SnippetFooter showAddSnippet={isViewNote ? false : true} handleAddSnippet={handleAddSnippet} index={index} />
                    </div>
                )
            })}
        </>
    )
}