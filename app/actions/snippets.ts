'use server'
import { Tables, TablesInsert, TablesUpdate } from "@/lib/types/database.types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSnippets(noteId: number) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .eq('note_id', noteId)
        .order('order', { ascending: true })
        .order('created_at', { ascending: true })
    if (error) {
        throw new Error(error.message)
    }  

    return data
}

export async function createSnippet(snippet: TablesInsert<'snippets'>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('snippets')
        .insert(snippet)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/notes/${snippet.note_id}`)
    return data
}

export async function updateSnippet(snippet: TablesUpdate<'snippets'>, revalidate: boolean = true) {
    if (!snippet.id) {
        throw new Error('Snippet ID is required')
    }
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('snippets')
        .update(snippet)
        .eq('id', snippet.id)
    if (error) {
        throw new Error(error.message)
    }

    if (revalidate) {
        revalidatePath(`/notes/${snippet.note_id}`)
    }
    return data
}

export async function deleteSnippet(snippetId: number, noteId: number) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', snippetId)
        .eq('note_id', noteId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/notes/${noteId}`)
    return data
}