import useSnippetStore from "@/store/snippetStore"
import SnippetCodeInput from "../../common/snippet-code-input"
import SnippetDetailInput from "../../common/snippet-detail-input"
import { Tables } from "@/lib/types/database.types"
import NoteCreateHeader from "../note-create-header/note-create-header"
import { createSnippet } from "@/app/actions/snippets"
import SnippetCreateHeader from "../note-create-header/snippet-create-header"
import SnippetFooter from "../../common/snippet-footer"
import { DEFAULT_SNIPPET_CODE, DEFAULT_SNIPPET_DETAIL, DEFAULT_SNIPPET_LANGUAGE, DEFAULT_SNIPPET_FILE_NAME } from "@/lib/constants/default-values"
import { toast } from "sonner"
export default function SnippetList({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()

    async function handleAddSnippet() {
        const lastSnippet = snippetStore.snippets[snippetStore.snippets.length - 1]

        const snippetPayload = {
            code: DEFAULT_SNIPPET_CODE,
            detail: DEFAULT_SNIPPET_DETAIL,
            language: DEFAULT_SNIPPET_LANGUAGE,
            file_name: DEFAULT_SNIPPET_FILE_NAME,
            note_id: note.id,
            order: lastSnippet.order + 1,
        }

        snippetStore.addSnippet({
            id: window.crypto.randomUUID(),
            ...snippetPayload,
            created_at: new Date().toISOString(),
        })

        setTimeout(() => {
            scroll('next')
        }, 300)
        try {
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

    function scroll(direction: 'next' | 'prev') {
        window.scrollTo({
            top: window.scrollY + (direction === 'next' ? window.innerHeight : -window.innerHeight),
            behavior: 'smooth'
        });
    }
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
                        <SnippetFooter showAddSnippet={index === snippetStore.snippets.length - 1} handleAddSnippet={handleAddSnippet} index={index} />
                    </div>
                )
            })}
        </>
    )
}