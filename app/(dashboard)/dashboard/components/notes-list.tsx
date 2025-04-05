
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotesList({ notes }: { notes: any[] }   ) {
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link href={`/notes/${note.id}`} key={note.id} className="block">
            <Card className="h-full transition-all hover:shadow-md">
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