import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/types/database.types";
import useSidebarStore from "@/store/sidebarStore";
import { Menu } from "lucide-react";

export default function ViewNoteHeader({ index, note }: { index: number, note: Tables<'notes'> }) {
    const sidebarStore = useSidebarStore();
    console.log(index)
    return (
        <div className="flex-1">
            <header className="note-header pl-0">
                <div className="flex items-start gap-2">
                    <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => sidebarStore.setIsOpen(true)}>
                                <Menu className="h-5 w-5" />
                            </Button>
                            {index === 0 && (
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold">{note.title}</h1>
                                    <p className="text-sm text-muted-foreground">{note.description}</p>
                                </div>
                            )}
                    </div>
                </div>
            </header>
        </div>
    )
}