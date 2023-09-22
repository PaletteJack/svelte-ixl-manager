import { writable } from "svelte/store";

export const drawer = writable({
    active: false,
    content: null,
    header: '',
    styles: '',
    props: {}
})

export function triggerDrawer({ content, header, styles, props = {} }) {
    drawer.set({active: true, content, header, styles, props });
}

export function closeDrawer() {
    drawer.set({active: false, content: null, header: '', styles: '', props: {}})
}