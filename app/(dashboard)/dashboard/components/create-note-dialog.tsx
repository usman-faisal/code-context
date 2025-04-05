"use client"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { createNote } from "@/app/actions/notes"
import { useRouter } from "next/navigation"

export default function CreateNoteDialog() {
    const [open, setOpen] = useState(false)
    const [newNote, setNewNote] = useState({
      title: "",
      description: "",
    })
    const router = useRouter()
    const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const createdNote = await createNote(newNote.title, newNote.description)
            toast.success('Note created successfully!')
            setOpen(false)
            setNewNote({ title: '', description: '' })
            router.push(`/notes/${createdNote.id}`)
        } catch (error) {
            console.error('Error creating note:', error)
            toast.error('Failed to create note. Please try again.')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create Note
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreateNote}>
                    <DialogHeader>
                        <DialogTitle>Create New Note</DialogTitle>
                        <DialogDescription>Add a title and description for your new note.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                placeholder="Note title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={newNote.description}
                                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                                placeholder="Write your note here..."
                                className="min-h-[100px]"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Note</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
