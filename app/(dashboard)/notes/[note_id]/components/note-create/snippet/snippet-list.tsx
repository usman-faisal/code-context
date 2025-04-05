import useSnippetStore from "@/store/snippetStore"
import SnippetCodeInput from "../../common/snippet-code-input"
import SnippetDetailInput from "../../common/snippet-detail-input"
import { Tables } from "@/lib/types/database.types"
import NoteCreateHeader from "../note-create-header/note-create-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSnippet } from "@/utils/api/snippets"
import SnippetCreateHeader from "../note-create-header/snippet-create-header"
import SnippetFooter from "../../common/snippet-footer"
export default function SnippetList({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore()
    const queryClient = useQueryClient()
    const {mutateAsync: createSnippetMutation} = useMutation({
        mutationFn: () => createSnippet(note.id, `console.log('hello')`, `# This is a snippet`, snippetStore.snippets.length + 1),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets', note.id] })
        }
    })

    async function handleAddSnippet() {
        await createSnippetMutation();
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 300);
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