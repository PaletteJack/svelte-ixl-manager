import { writable } from 'svelte/store';
export const classDataStore = writable({ teachers: [], students: [] });