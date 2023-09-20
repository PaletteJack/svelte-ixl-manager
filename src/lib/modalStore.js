import { writable } from "svelte/store";

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