import { Tables } from "@/lib/types/database.types";


export default function ViewNoteHeader({ note }: { note: Tables<'notes'> }) {
    return (
        <header className="note-header">
            <div className="flex items-start     gap-2 ">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{note.title}</h1>
                    <p className="text-sm text-muted-foreground">{note.description}</p>
                </div>
            </div>
        </header>
    )
}