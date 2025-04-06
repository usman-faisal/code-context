import { ArrowRightIcon } from "lucide-react";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useSnippetStore from "@/store/snippetStore";
import { scroll } from "@/lib/utils";

export default function SnippetFooter({ showAddSnippet, handleAddSnippet, index }: { showAddSnippet: boolean, handleAddSnippet: () => void, index: number }) {
    const snippetStore = useSnippetStore()
    return (
        <footer className="px-8 py-4 flex items-center justify-between">
            {
                showAddSnippet ?
                    <Button onClick={() => handleAddSnippet()} variant="ghost">
                        <PlusIcon className="w-4 h-4" />
                        Add Snippet
                    </Button>
                    : <div></div>
            }
            <div className="flex items-center gap-2">
                <Button disabled={index === 0} onClick={() => scroll('prev')} variant="ghost">
                    <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <Button disabled={index === snippetStore.snippets.length - 1} onClick={() => scroll('next')} variant="ghost">
                    <ArrowRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </footer>
    )
}