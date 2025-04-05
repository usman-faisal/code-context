"use server"

import { Tables } from "@/lib/types/database.types"
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
        throw new Error('Failed to create note')
    }

    revalidatePath('/dashboard')
    return data[0]
}

export async function updateNote(id: string, data: Partial<Tables<'notes'>>) {
    const supabase = await createClient()
    
    const { error, data: dataReturned } = await supabase          
        .from('notes')
        .update(data)
        .eq('id', parseInt(id))
        .select()

    if (error) {
        throw new Error('Failed to update note')
    }
    revalidatePath(`/notes/${id}`)
    return dataReturned[0]
}