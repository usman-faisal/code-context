'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/types/database.types";
import Link from "next/link";
import { EyeIcon, LockIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/app/actions/notes";

import { toast } from "sonner";
export default function NotesList({ notes }: { notes: Tables<'notes'>[] }   ) {
    const handleDelete = async (id: string) => {
      try {
        await deleteNote(id);
      } catch (error) {
        toast.error('Failed to delete note')
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link href={`/notes/${note.id}`} key={note.id} className="block" aria-label={`View note: ${note.title}`}>
              <Card className="h-full transition-all hover:shadow-md relative group">
                <div className="absolute top-2 right-14 z-10">
                  <Button variant="ghost" size="icon" aria-label={note.is_public ? "Note is public" : "Note is private"} tabIndex={-1} >
                    {note.is_public ? <EyeIcon className="size-4" /> : <LockIcon className="size-4" />}
                  </Button>
                </div>
                <div className="absolute top-2 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete(note.id);
                    }}
                    aria-label={`Delete note: ${note.title}`}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{note.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">{new Date(note.created_at).toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    )
}