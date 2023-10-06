import { writable } from "svelte/store";

// Toast store

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

// Modal Store
export const modal = writable({
    active: false,
    content: null,
    header: '',
    styles: '',
    props: {}
})

export function triggerModal({ content, header, styles, props = {} }) {
    modal.set({active: true, content, header, styles, props });
}

export function closeModal() {
    modal.set({active: false, content: null, header: '', styles: '', props: {}})
}

// Drawer Store

export const drawer = writable({
    active: false,
    content: null,
    styles: '',
    props: {}
})

export function triggerDrawer({ content, styles, props = {} }) {
    drawer.set({active: true, content, styles, props });
}

export function closeDrawer() {
    drawer.set({active: false, content: null, styles: '', props: {}})
}