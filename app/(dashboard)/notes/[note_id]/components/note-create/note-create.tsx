'use client'

import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { useEffect } from "react";
import NoSnippetCreated from "./snippet/no-snippet-created";
import SnippetList from "./snippet/snippet-list";
import { registerScrollEvent } from "@/lib/utils";

export default function NoteCreate({ note, snippets }: { note: Tables<'notes'>, snippets: Tables<'snippets'>[] }) {
    const snippetsStore = useSnippetStore()

    useEffect(() => {
        if (snippets && snippets?.length > 0) {
            snippetsStore.setSnippets(snippets)
        }
        return () => {
            snippetsStore.setSnippets([])
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
                    <NoSnippetCreated note={note} />
                    :
                    <SnippetList note={note} />
            }
        </>
    )
}