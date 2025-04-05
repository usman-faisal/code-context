import NotesList from "./components/notes-list"
import { createClient } from "@/utils/supabase/server"
import CreateNoteDialog from "./components/create-note-dialog"

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user?.id ?? '')

  if (error) {
    console.error('Error fetching notes:', error)
    return <div>Error fetching notes</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <CreateNoteDialog />
      </div>

      <NotesList notes={notes || []} />
    </div>
  )
}

