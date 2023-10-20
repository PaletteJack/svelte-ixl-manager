import { writable } from 'svelte/store';
// section
export const classDataStore = writable({ teachers: [], students: [] });

// school
export const schoolDataStore = writable({ student_count: 0, teacher_count: 0, section_count: 0 });

// student
export const studentDataStore = writable([]);

// teachers
export const teacherDataStore = writable([]);