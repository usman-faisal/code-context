'use client'

import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { useEffect } from "react";
import SnippetList from "./common/snippet-list";
import { registerScrollEvent } from "@/lib/utils";
import NoSnippetsCreated from "./common/no-snippets-created";
export default function RenderNotePage({ note, snippets, isViewNote }: { note: Tables<'notes'>, snippets: Tables<'snippets'>[], isViewNote: boolean }) {
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
                snippetsStore.snippets.length === 0
                    ?
                    <NoSnippetsCreated note={note} isViewNote={isViewNote} />
                    :
                    <SnippetList isViewNote={isViewNote} note={note} />
            }
        </>
    )
}