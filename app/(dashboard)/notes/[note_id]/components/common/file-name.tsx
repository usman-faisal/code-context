import { updateSnippet } from "@/app/actions/snippets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tables } from "@/lib/types/database.types";
import { PencilIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { FILE_EXTENSIONS } from "@/lib/constants/constants";
import useSnippetStore from "@/store/snippetStore";
export default function FileName({ snippet }: {  snippet: Tables<'snippets'> }) {
    const [isEditing, setIsEditing] = useState(false)
    const [fileName, setFileName] = useState<string>(snippet.file_name ?? '')
    const [language, setLanguage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const snippetStore = useSnippetStore()

    function handleChange(value: string) {
        setFileName(value)
        if (value.length === 0) {
            setError('File name is required')
            return
        }
        const extension = value.split('.').pop()
        if (!extension || !FILE_EXTENSIONS[extension as keyof typeof FILE_EXTENSIONS]) {
            setError('Invalid file extension')
            return
        }
        setError(null)
        setLanguage(FILE_EXTENSIONS[extension as keyof typeof FILE_EXTENSIONS])
    }

    async function handleSave() {
        if(error)
        {
            setFileName(snippet.file_name ?? '')
            setError(null)
            setLanguage(null)
            setIsEditing(false)
            return
        }
        setIsEditing(false)
        snippetStore.updateSnippet(snippet.id, {
            ...snippet,
            file_name: fileName,
            language: language
        })
        updateSnippet({
            id: snippet.id,
            file_name: fileName,
            language: language
        }, false)
    }

    return (
        <div className="flex items-center justify-between">
            {isEditing ? (
                <div className="flex items-center gap-2">
                    <Input type="text" value={fileName} onChange={(e) => handleChange(e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={handleSave}>
                        <CheckIcon className="w-4 h-4" />
                    </Button>
                </div>
            ):
            (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{fileName}</span>
                    <Button disabled={error !== null} variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                        <PencilIcon className="w-4 h-4" />
                    </Button>
                </div>
            )
        }
        {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}