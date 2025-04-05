'use client'
import { Textarea } from "@/components/ui/textarea";
import useSnippetStore from "@/store/snippetStore";
import { Tables } from "@/lib/types/database.types";
import { updateSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import MDEditor from '@uiw/react-md-editor';
export default function SnippetDetailInput({snippet, isReadonly}: {snippet: Tables<'snippets'>, isReadonly: boolean}) {
    const snippetStore = useSnippetStore();
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const [mode, setMode] = useState<'preview' | 'edit'>(isReadonly ? 'preview' : 'edit');
    const updateInDatabase = useCallback((value: string | undefined) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            toast.loading('saving...');
            await updateSnippet({
                id: snippet.id,
                detail: value ?? ''
            });
            toast.success('saved');
            setTimeout(() => {
                toast.dismiss();
            }, 1000);
        }, 1000);
    }, [snippet.id, snippet.code]);

    function handleChange(value: string) {
        snippetStore.updateSnippet(snippet.id, {
            ...snippet,
            detail: value
        });
        
        updateInDatabase(value);
    }
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-4">
                {
                    !isReadonly ? (
                        <>
                            <Button variant="ghost"  onClick={() => setMode('preview')}>
                                Preview
                            </Button>
                            <Button variant="ghost"  onClick={() => setMode('edit')}>
                                Edit
                            </Button>
                        </>
                    ) : (
                        <Button variant='ghost'>Context</Button>
                    )
                }
            </div>
            {mode === 'preview' ? (
                <MDEditor overflow value={snippet.detail} hideToolbar className="bg-white" height="100%" preview="preview"/>
            ) : (
                <MDEditor value={snippet.detail} preview="edit" hideToolbar height="100%"  onChange={(value) => handleChange(value ?? '')} />
            )}
        </div>
    )
}