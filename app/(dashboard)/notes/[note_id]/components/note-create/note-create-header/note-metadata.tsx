"use client"
import { Tables } from "@/lib/types/database.types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil } from "lucide-react";
import { updateNote } from "@/app/actions/notes";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function NoteMetadata({ note }: { note: Tables<'notes'> }) {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        await updateNote(note.id.toString(), {
            title,
            description
        });
    };

    const handleChange = (field: 'title' | 'description', value: string) => {
        if (field === 'title') {
            setTitle(value);
        } else {
            setDescription(value);
        }
    };

    return (
        <div className={cn(
            "flex items-start gap-2",
        )}>
            <div className="flex-1">
                {isEditing ? (
                    <div className="flex self-center gap-2 ">
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="text-2xl font-bold bg-accent-foreground/10 focus:outline-none focus:ring-0 w-full rounded-md"
                        />
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="text-sm text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                        />
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </>
                )}
            </div>
            {isEditing ? (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setIsEditing(!isEditing);
                        handleSave();
                    }}
                >
                    <Check className="h-4 w-4 text-green-500" />
                </Button>
            ) : (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}