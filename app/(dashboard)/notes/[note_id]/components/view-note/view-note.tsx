'use client'

import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { useEffect } from "react";
import SnippetList from "./snippet/snippet-list";
import { registerScrollEvent } from "@/lib/utils";

export default function ViewNote({ note, snippets }: { note: Tables<'notes'>, snippets: Tables<'snippets'>[] }) {
    const snippetsStore = useSnippetStore()

    useEffect(() => {
        if (snippets && snippets?.length > 0) {
            snippetsStore.setSnippets(snippets)
        }
    }, [snippets])

    useEffect(() => {
        registerScrollEvent()       
    }, [])

    return (
        <>
            {
                snippetsStore.snippets.length < 1
                    ?
                    <div>No snippets created</div>
                    :
                    <SnippetList note={note} />
            }
        </>
    )
}