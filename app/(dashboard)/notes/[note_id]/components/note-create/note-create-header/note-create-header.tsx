import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import NoteMetadata from "./note-metadata";
import { Tables } from "@/lib/types/database.types";
import { updateNote } from "@/app/actions/notes";
import { toast } from "sonner";
export default function NoteCreateHeader({ note }: { note: Tables<'notes'> }) {
    const handlePublish = async() => {
        await updateNote(note.id.toString(), {
            is_public: !note.is_public
        })
        toast.success(note.is_public ? 'Note unpublished' : 'Note published')
    }
    return (
        <header className="flex items-center justify-between py-4 px-8">
                <NoteMetadata note={note} />
                <div className="flex gap-2">
                <Button onClick={() => handlePublish()} variant="outline">
                    <SaveIcon className="w-4 h-4" />
                    {note.is_public ? 'Unpublish' : 'Publish'}
                </Button>
            </div>
        </header>

    )
}