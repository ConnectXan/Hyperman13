import { create } from 'zustand';

export const useStore = create((set) => ({
    activeServiceId: null, // ID of the currently selected/hovered service
    setActiveServiceId: (id) => set({ activeServiceId: id }),

    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
