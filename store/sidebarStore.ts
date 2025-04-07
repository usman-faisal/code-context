// create snippets store

import { create } from "zustand";

interface SidebarStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useSidebarStore;