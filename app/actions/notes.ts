"use server"

import { TablesUpdate } from "@/lib/types/database.types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createNote(title: string, description: string) {
    const supabase = await createClient()
    
    const { error, data } = await supabase
        .from('notes')
        .insert([
            {
                title,
                description,
            }
        ]).select()

    if (error) {
        console.log(error)
        throw new Error('Failed to create note')
    }

    revalidatePath('/dashboard')
    return data[0]
}

export async function updateNote(id: string, data: TablesUpdate<'notes'>) {
    const supabase = await createClient()
    
    const { error, data: dataReturned } = await supabase          
        .from('notes')
        .update(data)
        .eq('id', id)
        .select()

    if (error) {
        throw new Error('Failed to update note')
    }
    revalidatePath(`/notes/${id}`)
    return dataReturned[0]
}

export async function deleteNote(id: string) {
    const supabase = await createClient()
    
    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (error) {
        console.log(error)
        throw new Error('Failed to delete note')
    }

    revalidatePath('/dashboard')
}
