'use client';

import { updateSnippet } from '@/app/actions/snippets';
import { useCallback, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import GenerateDetailsWithAIButton from '../note-create/note-create-header/generate-details-with-ai-button';
import { useAutoSave } from '@/hooks/useAutoSave';
import { Tables } from '@/lib/types/database.types';
import useSnippetStore from '@/store/snippetStore';
import { Button } from '@/components/ui/button';
export default function SnippetDetailInput({
  snippet,
  isReadonly,
}: {
  snippet: Tables<'snippets'>;
  isReadonly: boolean;
}) {
  const snippetStore = useSnippetStore();
  const [mode, setMode] = useState<'preview' | 'edit'>(
    isReadonly ? 'preview' : 'edit'
  );

  const buildDetailPayload = useCallback((value: string | undefined) => {
    return {
      id: snippet.id,
      detail: value ?? '',
    };
  }, [snippet.id]);

  const triggerSaveDetail = useAutoSave({
    updateFn: updateSnippet,
    buildPayload: buildDetailPayload,
    toastIdBase: `snippet-${snippet.id}-detail`,
    dependencies: [buildDetailPayload],
  });

  function handleChange(value: string | undefined) {
    snippetStore.updateSnippet(snippet.id, {
      ...snippet,
      detail: value ?? '',
    });

    triggerSaveDetail(value);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4">
        {!isReadonly ? (
          <>
            <Button variant="ghost" onClick={() => setMode('preview')}>
              Preview
            </Button>
            <Button variant="ghost" onClick={() => setMode('edit')}>
              Edit
            </Button>
            <GenerateDetailsWithAIButton snippet={snippet} />
          </>
        ) : (
          <Button variant="ghost">Context</Button>
        )}
      </div>
      {mode === 'preview' ? (
        <MDEditor
          overflow
          value={snippet.detail ?? ''} // Ensure value is not null/undefined
          hideToolbar
          height='100%'
          className='md:h-[calc(100vh-12rem)] md:max-h-[calc(100vh-12rem)] overflow-y-auto'
          preview="preview"
        />
      ) : (
        <MDEditor
          value={snippet.detail ?? ''} // Ensure value is not null/undefined
          preview="edit"
          height='100%'
          hideToolbar
          className='md:h-[calc(100vh-12rem)] md:max-h-[calc(100vh-12rem)] overflow-y-auto'
          onChange={(value) => handleChange(value)} // Pass value directly
        />
      )}
    </div>
  );
}