import { writable } from 'svelte/store';
export const schoolDataStore = writable({ student_count: 0, teacher_count: 0, section_count: 0 });