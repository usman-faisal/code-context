import useSnippetStore from "@/store/snippetStore"
import SnippetCodeInput from "../../common/snippet-code-input"
import SnippetDetailInput from "../../common/snippet-detail-input"
import { Tables } from "@/lib/types/database.types"
import SnippetFooter from "../../common/snippet-footer"
import ViewNoteHeader from "./view-note-header"
export default function SnippetList({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()
    
    return (
        <>
            {snippetStore.snippets.map((snippet, index) => {
                return (
                    <div key={snippet.id} className="min-h-screen max-h-screen relative">
                        <ViewNoteHeader note={note} />
                        <main className="px-8 grid grid-cols-2 gap-4 h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)] ">
                            <SnippetCodeInput isReadonly={true} snippet={snippet} />
                            <SnippetDetailInput isReadonly={true} snippet={snippet} />
                        </main>
                        <SnippetFooter showAddSnippet={false} index={index} />
                    </div>
                )
            })}
        </>
    )
}