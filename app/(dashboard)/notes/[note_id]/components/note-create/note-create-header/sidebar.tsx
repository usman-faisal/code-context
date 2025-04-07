'use client'

import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, LogOut, NotebookPenIcon, X } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/lib/types/database.types";
import { signout } from "@/lib/auth-actions";
import useSnippetStore from "@/store/snippetStore";
import { useEffect } from "react";
import useSidebarStore from "@/store/sidebarStore";


export default function Sidebar({ note }: { note: Tables<'notes'> }) {
    const snippetStore = useSnippetStore();
    const sidebarStore = useSidebarStore();
    
    useEffect(() => {
        const handleEscKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && sidebarStore.isOpen) {
                sidebarStore.setIsOpen(false);
            }
        };
        
        window.addEventListener('keydown', handleEscKeyPress);
        return () => window.removeEventListener('keydown', handleEscKeyPress);
    }, [sidebarStore.isOpen]);
    
    useEffect(() => {
        if (sidebarStore.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarStore.isOpen]);
    
    return (
        <>
            {sidebarStore.isOpen && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => sidebarStore.setIsOpen(false)}
                />
            )}
            
            <aside 
                className={`fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col p-4 z-50 transform transition-transform duration-300 ease-in-out ${sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <NotebookPenIcon className="h-6 w-6" />
                        <span className="font-bold text-lg">CodeContext</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => sidebarStore.setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                        <Link href="/dashboard/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => signout()}
                        className="justify-start text-destructive hover:text-destructive"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                    </Button>
                </div>
                
                <div className="flex flex-col mt-4">
                    <h3 className="font-medium text-sm text-sidebar-foreground opacity-70 mb-3">Current Note</h3>
                    <div className="px-3 py-2 bg-sidebar-accent rounded-md mb-4">
                        <h4 className="font-medium text-sm truncate">{note.title}</h4>
                    </div>
                </div>
                
                <div className="flex-1 overflow-auto">
                    <h3 className="font-medium text-sm text-sidebar-foreground opacity-70 mb-3">Snippets</h3>
                    {snippetStore.snippets.length === 0 ? (
                        <p className="text-xs text-sidebar-foreground opacity-50 p-2">No snippets added yet</p>
                    ) : (
                        <div className="space-y-2">
                            {snippetStore.snippets.map((snippet, index) => (
                                <div 
                                    key={snippet.id} 
                                    className="px-3 py-2 bg-sidebar-accent/50 hover:bg-sidebar-accent rounded-md cursor-pointer transition-colors"
                                    onClick={() => {
                                        document.querySelectorAll('[data-snippet-id]')[index]?.scrollIntoView({ behavior: 'smooth' });
                                        sidebarStore.setIsOpen(false);
                                    }}
                                >
                                    <p className="text-xs text-sidebar-foreground truncate">
                                        {index + 1}. {snippet.file_name || `Snippet ${index + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
