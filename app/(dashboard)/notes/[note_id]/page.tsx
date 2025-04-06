import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import RenderNotePage from "./components/render-note-page";
type NotePageProps = {
  params: Promise<{ note_id: string }>;
};

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { note_id } = resolvedParams;
  const supabase = await createClient();
    const { data: note } = await supabase
        .from('notes')
        .select('title, description')
        .eq('id', note_id)
        .single();

    return {
        title: note?.title || 'Note Not Found',
        description: note?.description || 'This note could not be found.',
    };
}

export default async function NotePage({ params }: NotePageProps) {
  const resolvedParams = await params;
  const { note_id } = resolvedParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: note, error: noteError } = await supabase
    .from('notes')
    .select('*')
    .eq('id', note_id)
    .single();

  if (noteError || !note) {
    console.error("Note fetch error:", noteError?.message || "Note data is null");
    notFound();
  }

  const { data: snippets, error: snippetsError } = await supabase
    .from('snippets')
    .select('*')
    .eq('note_id', note_id);

  if (snippetsError) {
    console.error("Snippets fetch error:", snippetsError.message);
  }

  const safeSnippets = Array.isArray(snippets) ? snippets : [];

  const noteBelongsToUser = user && note.user_id === user.id;

  return (
    <RenderNotePage note={note} snippets={safeSnippets} isViewNote={!noteBelongsToUser} />
  );
}