import { useRef, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

type UpdateFunction<Payload> = (payload: Payload) => Promise<any>;

type PayloadBuilder<Value, Payload> = (currentValue: Value) => Payload;

interface UseAutoSaveOptions<Value, Payload> {
  updateFn: UpdateFunction<Payload>;
  buildPayload: PayloadBuilder<Value, Payload>;
  debounceMs?: number;
  toastIdBase?: string;
  dependencies?: any[];
}

export function useAutoSave<Value, Payload>({
  updateFn,
  buildPayload,
  debounceMs = 1000,
  toastIdBase = 'autosave',
  dependencies = [],
}: UseAutoSaveOptions<Value, Payload>) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const uniqueToastId = `${toastIdBase}-${Math.random().toString(36).substring(7)}`;

  const triggerSave = useCallback(
    (value: Value) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        const payload = buildPayload(value);
        const loadingToastId = `${uniqueToastId}-loading`;

        toast.loading('saving...', {
          position: 'bottom-center',
          id: loadingToastId,
        });

        try {
          await updateFn(payload);
          toast.success('saved', {
            position: 'bottom-center',
            id: loadingToastId,
          });
          setTimeout(() => {
            toast.dismiss(loadingToastId);
          }, 1000);
        } catch (error) {
          console.error('Auto-save failed:', error);
          toast.error('Save failed', {
            position: 'bottom-center',
            id: loadingToastId,
          });
          setTimeout(() => {
            toast.dismiss(loadingToastId);
          }, 3000);
        }
      }, debounceMs);
    },
    [updateFn, buildPayload, debounceMs, uniqueToastId, ...dependencies]
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return triggerSave;
}