import useSnippetStore from "@/store/snippetStore"
import SnippetCodeInput from "../../common/snippet-code-input"
import SnippetDetailInput from "../../common/snippet-detail-input"
import { Tables } from "@/lib/types/database.types"
import NoteCreateHeader from "../note-create-header/note-create-header"
import SnippetCreateHeader from "../note-create-header/snippet-create-header"
import SnippetFooter from "../../common/snippet-footer"
import { handleSnippetCreation } from "@/lib/utils"
export default function SnippetList({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()

    return (
        <>
            {snippetStore.snippets.map((snippet, index) => {
                return (
                    <div key={snippet.id} className="min-h-screen max-h-screen relative">
                        {index !== 0 ?   <SnippetCreateHeader snippet={snippet} /> : <NoteCreateHeader note={note} />}

                        <main className="px-8 grid grid-cols-2 gap-4 h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]">
                            <SnippetCodeInput isReadonly={false} snippet={snippet} />
                            <SnippetDetailInput isReadonly={false} snippet={snippet} />
                        </main>
                        <SnippetFooter showAddSnippet={index === snippetStore.snippets.length - 1} handleAddSnippet={() => handleSnippetCreation(false, note, snippetStore)} index={index} />
                    </div>
                )
            })}
        </>
    )
}