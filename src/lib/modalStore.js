import { writable } from "svelte/store";

export const modal = writable({
    active: false,
    content: '',
    header: '',
    styles: ''
})

export function triggerModal({ content, header, styles }) {
    modal.set({active: true, content, header, styles });
}

export function closeModal() {
    modal.set({active: false, content: '', header: '', styles: ''})
}