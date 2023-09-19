import { writable } from "svelte/store";

export const toast = writable({
    active: false,
    message: '',
    bg: '',
    fontColor: '',
    styles: ''
})

export function triggerToast({ message, bg, fontColor, styles }) {
    toast.set({active: true, message, bg, fontColor, styles });
    setTimeout(() => {
        toast.set({ active: false, message: "" , styles });
    }, 3500)
}