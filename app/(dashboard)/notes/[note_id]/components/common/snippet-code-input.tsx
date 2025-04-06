"use client"
import { Button } from "@/components/ui/button";
import useSnippetStore from "@/store/snippetStore";
import { Editor } from "@monaco-editor/react";
import { CopyIcon } from "lucide-react";
import { Tables } from "@/lib/types/database.types";
import { updateSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";
import { useCallback, useRef } from "react";
import { DEFAULT_SNIPPET_LANGUAGE } from "@/lib/constants/default-values";
import FileName from "./file-name";
export default function SnippetCodeInput({ snippet, isReadonly }: { snippet: Tables<'snippets'>, isReadonly: boolean }) {
    const snippetStore = useSnippetStore()
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const updateInDatabase = useCallback((value: string | undefined) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(async () => {
            toast.loading('saving...', {position: 'bottom-center'});
            await updateSnippet({
                id: snippet.id,
                code: value ?? '',
                detail: snippet.detail,
                note_id: snippet.note_id
            }, false);
            toast.success('saved', {position: 'bottom-center'});
            setTimeout(() => {
                toast.dismiss();
            }, 1000);
        }, 1000);
    }, [snippet.id, snippet.detail]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(snippet.code);
    }, [snippet.code]);

    function handleChange(value: string | undefined) {
        snippetStore.updateSnippet(snippet.id, {
            ...snippet,
            code: value ?? ''
        });

        updateInDatabase(value);
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                {isReadonly ? <span className="text-sm text-muted-foreground">{snippet.file_name}</span> :
                    <FileName snippet={snippet} />
                }
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <CopyIcon className="w-4 h-4" />
                </Button>
            </div>
            <Editor
                className="h-full min-h-[200px]"
                options={{
                    wordWrap: 'on',
                    readOnly: isReadonly
                }}
                language={snippet.language ?? DEFAULT_SNIPPET_LANGUAGE}
                width="100%"
                theme="vs-dark"
                onChange={handleChange}
                value={snippet.code}
            />
        </div>
    )
}