import {create} from "zustand";

interface useCancelProModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useCancelProModal = create<useCancelProModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true }),
    onClose: () => set({isOpen: false}),
}))