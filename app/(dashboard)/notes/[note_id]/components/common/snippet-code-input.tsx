'use client';
import { updateSnippet } from '@/app/actions/snippets';
import { useCallback } from 'react';
import { DEFAULT_SNIPPET_LANGUAGE } from '@/lib/constants/default-values';
import FileName from './file-name';
import { useAutoSave } from '@/hooks/useAutoSave';
import { Tables } from '@/lib/types/database.types';
import useSnippetStore from '@/store/snippetStore';
import { Button } from '@/components/ui/button';
import { Editor } from '@monaco-editor/react';
import { CopyIcon } from 'lucide-react';


export default function SnippetCodeInput({
  snippet,
  isReadonly,
}: {
  snippet: Tables<'snippets'>;
  isReadonly: boolean;
}) {
  const snippetStore = useSnippetStore();

  const buildCodePayload = useCallback((value: string | undefined) => {
     return {
       id: snippet.id,
       code: value ?? '',
     };
  }, [snippet.id]);

  const triggerSaveCode = useAutoSave({
      updateFn: updateSnippet,
      buildPayload: buildCodePayload,
      toastIdBase: `snippet-${snippet.id}-code`,
      dependencies: [buildCodePayload],
  });


  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(snippet.code ?? '');
  }, [snippet.code]);

  function handleChange(value: string | undefined) {
    snippetStore.updateSnippet(snippet.id, {
      ...snippet,
      code: value ?? '',
    });

    triggerSaveCode(value);
  }

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        {isReadonly ? (
          <span className="text-sm text-muted-foreground">
            {snippet.file_name}
          </span>
        ) : (
          <FileName snippet={snippet} />
        )}
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <CopyIcon className="w-4 h-4" />
        </Button>
      </div>
      <Editor
        className="h-full min-h-[200px]"
        options={{
          wordWrap: 'on',
          readOnly: isReadonly,
        }}
        language={snippet.language ?? DEFAULT_SNIPPET_LANGUAGE}
        width="100%"
        theme="vs-dark"
        onChange={handleChange}
        value={snippet.code ?? ''}
      />
    </div>
  );
}