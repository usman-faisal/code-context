'use client'

import { Tables } from "@/lib/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { getSnippets } from "@/utils/api/snippets";
import useSnippetStore from "@/store/snippetStore";
import { useEffect } from "react";
import NoSnippetCreated from "./snippet/no-snippet-created";
import SnippetList from "./snippet/snippet-list";
import { registerScrollEvent } from "@/lib/utils";

export default function NoteCreate({ note }: { note: Tables<'notes'> }) {
    const { data: snippets, isLoading } = useQuery({
        queryKey: ['snippets', note.id],
        queryFn: () => getSnippets(note.id)
    })

    const snippetsStore = useSnippetStore()

    useEffect(() => {
        if (snippets && snippets?.length > 0) {
            snippetsStore.setSnippets(snippets)
        }
    }, [snippets])

    useEffect(() => {
        registerScrollEvent()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

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