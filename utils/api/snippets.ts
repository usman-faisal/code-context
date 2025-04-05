import { createClient } from "@/utils/supabase/client"

export async function getSnippets(noteId: number) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .eq('note_id', noteId)
        .order('order', { ascending: true })
    if (error) {
        throw new Error(error.message)
    }  

    return data
}

export async function createSnippet(noteId: number, code: string, detail: string, order: number) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('snippets')
        .insert({ note_id: noteId, code, detail, order  })   
    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function updateSnippet(snippetId: number, code: string, detail: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('snippets')
        .update({ code, detail })
        .eq('id', snippetId)
    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function deleteSnippet(snippetId: number, noteId: number) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', snippetId)
        .eq('note_id', noteId)

    if (error) {
        throw new Error(error.message)
    }

    return data
}