import { Tables } from "@/lib/types/database.types";
import { useState, useEffect } from "react";
import { updateNote } from "@/app/actions/notes";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const inputVerticalPadding = "py-1";
const inputHorizontalPadding = "px-3";
const transparentBorder = "border border-transparent";
const inputHeight = "h-6";

export default function NoteMetadata({ note }: { note: Tables<'notes'> }) {
    const [title, setTitle] = useState(note.title || ""); // Initialize with empty string if null
    const [description, setDescription] = useState(note.description || ""); // Initialize with empty string if null
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        setTitle(note.title || "");
        setDescription(note.description || "");
    }, [note.title, note.description]);

    const handleSave = async (field: 'title' | 'description') => {
        if (field === 'title' && title === note.title) return;
        if (field === 'description' && description === note.description) return;


        try {
            await updateNote(note.id.toString(), {
                [field]: field === 'title' ? title : description
            });
        } catch (error) {
            console.error('Failed to update note:', error);
            if (field === 'title') setTitle(note.title || "");
            if (field === 'description') setDescription(note.description || "");
        }
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        if (title.trim() !== (note.title || "").trim()) {
            handleSave('title');
        } else {
            setTitle(note.title || "");
        }
    };

    const handleDescriptionBlur = () => {
        setIsEditingDescription(false);
        if (description.trim() !== (note.description || "").trim()) {
            handleSave('description');
        } else {
            setDescription(note.description || "");
        }
    };

    const inputBaseClasses = "bg-accent-foreground/10 focus:outline-none focus:ring-0 w-full rounded-md";


    return (
        <div className="flex-1 space-y-1">
            {isEditingTitle ? (
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleTitleBlur();
                        } else if (e.key === 'Escape') {
                            setTitle(note.title || "");
                            setIsEditingTitle(false);
                        }
                    }}
                    className={cn(
                        "text-2xl font-bold",
                        inputBaseClasses,
                        inputVerticalPadding,
                        inputHorizontalPadding,
                        inputHeight
                    )}
                    autoFocus
                    placeholder="Untitled Note"
                />
            ) : (
                <h1
                    className={cn(
                        "text-lg font-bold cursor-pointer hover:bg-accent-foreground/10 rounded-md",
                        inputVerticalPadding,
                        inputHorizontalPadding,
                        transparentBorder,
                        inputHeight,
                        "flex items-center"
                    )}
                    onClick={() => setIsEditingTitle(true)}
                    title="Click to edit title"
                >
                    {title || <span className="italic text-muted-foreground/80">Untitled Note</span>}
                </h1>
            )}
            {isEditingDescription ? (
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleDescriptionBlur();
                        } else if (e.key === 'Escape') {
                            setDescription(note.description || ""); // Revert on Escape
                            setIsEditingDescription(false);
                        }
                    }}
                    className={cn(
                        "text-sm text-muted-foreground",
                        inputBaseClasses,
                        inputVerticalPadding,
                        inputHorizontalPadding,
                        inputHeight
                    )}
                    autoFocus
                    placeholder="Add description..."
                />
            ) : (
                <p
                    className={cn(
                        "text-sm text-muted-foreground cursor-pointer hover:bg-accent-foreground/10 rounded-md",
                        inputVerticalPadding,
                        inputHorizontalPadding,
                        transparentBorder,
                        inputHeight,
                        "flex items-center"
                    )}
                    onClick={() => setIsEditingDescription(true)}
                    title="Click to edit description"
                >
                    {description || <span className="italic text-muted-foreground/80">Add description...</span>}
                </p>
            )}
        </div>
    )
}