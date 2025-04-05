import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DEFAULT_SNIPPET_CODE, DEFAULT_SNIPPET_DETAIL, DEFAULT_SNIPPET_FILE_NAME, DEFAULT_SNIPPET_LANGUAGE } from "./constants/default-values";
import { Tables } from "./types/database.types";
import { createSnippet } from "@/app/actions/snippets";
import { toast } from "sonner";
import useSnippetStore from "@/store/snippetStore";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scroll(direction: 'next' | 'prev') {
  window.scrollTo({
      top: window.scrollY + (direction === 'next' ? window.innerHeight : -window.innerHeight),
      behavior: 'smooth'
  });
}

// register event key listener for scroll
export function registerScrollEvent() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      scroll('next')
    }
    if (e.key === 'ArrowLeft') {
      scroll('prev')
    }
  })
}

export async function handleSnippetCreation(isFirst: boolean = false, note: Tables<'notes'>) {
  const snippetStore = useSnippetStore()
  try {
      const lastOrder = isFirst ? 1 : snippetStore.snippets[snippetStore.snippets.length - 1]?.order + 1 || 1;

      const snippetPayload = {
          code: DEFAULT_SNIPPET_CODE,
          detail: DEFAULT_SNIPPET_DETAIL,
          language: DEFAULT_SNIPPET_LANGUAGE,
          file_name: DEFAULT_SNIPPET_FILE_NAME,
          note_id: note.id,
          order: lastOrder,
      };

      snippetStore.addSnippet({
          id: window.crypto.randomUUID(),
          ...snippetPayload,
          created_at: new Date().toISOString(),
      });

      if (!isFirst) {
          setTimeout(() => {
              scroll('next');
          }, 300);
      }

      await createSnippet(snippetPayload);
      toast.success('Snippet created');
  } catch (error) {
      if (error instanceof Error) {
          toast.error(error.message ?? 'Something went wrong');
      } else {
          toast.error('Something went wrong');
      }
  }
}
