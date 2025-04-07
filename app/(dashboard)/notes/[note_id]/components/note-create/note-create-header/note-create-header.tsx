import { Button } from "@/components/ui/button";
import { SaveIcon, CopyIcon } from "lucide-react";
import NoteMetadata from "./note-metadata";
import { Tables } from "@/lib/types/database.types";
import { updateNote } from "@/app/actions/notes";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useSidebarStore from "@/store/sidebarStore";
import { Menu } from "lucide-react";

export default function NoteCreateHeader({ note }: { note: Tables<'notes'> }) {
    const [open, setOpen] = useState(false);
    const noteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/notes/${note.id}`;
    const sidebarStore = useSidebarStore();
    const handlePublish = async () => {
        try{
            await updateNote(note.id.toString(), {
                is_public: !note.is_public
            });
            toast.success(`Note ${note.is_public ? 'unpublished' : 'published'} successfully`, {position: 'bottom-center'});
        } catch (error) {
            toast.error(`Failed to ${note.is_public ? 'unpublish' : 'publish'} note`);
        }
        setOpen(false);
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(noteUrl);
    };

    return (
        <div className="flex-1">
            <header className="note-header pl-0">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => sidebarStore.setIsOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <NoteMetadata note={note} />
                </div>
                <div className="flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <SaveIcon className="w-4 h-4 mr-2" />
                                {note.is_public ? 'Unpublish' : 'Publish'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{note.is_public ? 'Unpublish Note' : 'Publish Note'}</DialogTitle>
                                <DialogDescription>
                                    {note.is_public
                                        ? 'This will make your note private and remove it from public access.'
                                        : 'This will make your note public and accessible to anyone with the link.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        readOnly
                                        value={noteUrl}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleCopyUrl}
                                    >
                                        <CopyIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handlePublish}>
                                    {note.is_public ? 'Unpublish' : 'Publish'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>
        </div>
    );
}