'use client'

import { Tables } from "@/lib/types/database.types";
import useSnippetStore from "@/store/snippetStore";
import { useEffect, useState } from "react";
import SnippetList from "./common/snippet-list";
import { registerScrollEvent } from "@/lib/utils";
import NoSnippetsCreated from "./common/no-snippets-created";
import Loader from "@/components/ui/loader";
export default function RenderNotePage({ note, snippets, isViewNote }: { note: Tables<'notes'>, snippets: Tables<'snippets'>[], isViewNote: boolean }) {
    const snippetsStore = useSnippetStore()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (snippets && snippets?.length > 0) {
            snippetsStore.setSnippets(snippets)
        }
        setLoading(false)
        return () => {
            snippetsStore.setSnippets([])
        }
    }, [snippets])

    useEffect(() => {
        registerScrollEvent()       
    }, [])

    if (loading) {
        return <Loader />
    }

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