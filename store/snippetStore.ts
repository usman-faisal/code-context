// create snippets store

import { Tables } from "@/lib/types/database.types";
import { create } from "zustand";

type Snippet = Tables<'snippets'>

interface SnippetStore {
    snippets: Snippet[];
    setSnippets: (snippets: Snippet[]) => void;
    addSnippet: (snippet: Snippet) => void;
    removeSnippet: (id: string) => void;
    updateSnippet: (id: string, snippet: Snippet) => void;
    deleteSnippet: (id: string) => void;
}


const useSnippetStore = create<SnippetStore>((set) => ({
    snippets: [],
    setSnippets: (snippets: Snippet[]) => set({ snippets }),
    addSnippet: (snippet: Snippet) => set((state) => ({ snippets: [...state.snippets, { ...snippet }] })),
    removeSnippet: (id: string) => set((state) => ({ snippets: state.snippets.filter((snippet) => snippet.id !== id) })),
    updateSnippet: (id: string, snippet: Snippet) => set((state) => ({ snippets: state.snippets.map((s) => s.id === id ? snippet : s) })),
    deleteSnippet: (id: string) => set((state) => ({ snippets: state.snippets.filter((snippet) => snippet.id !== id) })),
}));

export default useSnippetStore;
