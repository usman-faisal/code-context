import { createClient } from "@/utils/supabase/server";
import NoteCreate from "./components/note-create/note-create";
import { ThemeProvider } from "@/providers/theme-provider";
import ViewNote from "./components/view-note/view-note";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { note_id: string } }): Promise<Metadata> {
    const { note_id } = await params
    const supabase = await createClient()
    const { data: note } = await supabase.from('notes').select('*').eq('id', note_id).single()
    return {
        title: note?.title,
        description: note?.description,
    }
}
  

export default async function NotePage({ params }: { params: { note_id: string } }) {
  const { note_id } = await params
  const supabase = await createClient()


  // get user
  const { data: user } = await supabase.auth.getUser()



  // get note
  const { data: note, error: noteError } = await supabase.from('notes').select('*').eq('id', note_id).single()
  const { data: snippets, error: snippetsError } = await supabase.from('snippets').select('*').eq('note_id', note_id)
  
  const noteBelongsToUser = note?.user_id === user.user?.id

  // if note does not exist, redirect to dashboard
  if (noteError || !note) {
    return <div>Error: {noteError.message}</div>
  }

  if (!Array.isArray(snippets) || snippetsError) {
    return <div>Error: {snippetsError?.message}</div>
  }
  
  return (
    <>
        {
            !noteBelongsToUser ? (
            // display preview page
              <ViewNote note={note} snippets={snippets}/>
        ) : (
            // display edit page
            <NoteCreate note={note} snippets={snippets}/>
        )
    }
    </>
  );
}