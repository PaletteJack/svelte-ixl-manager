import { getSchoolTeachers } from '$lib/server/db';
import { createNewTeacher, deleteTeachers, assignSectionToTeacher, getTeacherSections, deleteSectionsFromTeacher } from '$lib/server/db/index.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const schoolID = Number(params.school)
    const teachers = getSchoolTeachers(schoolID)
    return { 
        teachers
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addTeacher: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const result = createNewTeacher(body)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Teacher Added"
        }
    },

    deleteTeachers: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const teacher_ids = body.teachers.split(',').map(Number)

        const result = deleteTeachers(teacher_ids)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Teacher(s) deleted"
        }
    },

    addSectionToTeacher: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const sections = body.sections.split(",").map(Number)
        const teacher_id = Number(body.teacher_id)

        const result = assignSectionToTeacher(sections, teacher_id);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const newData = getTeacherSections(teacher_id)

        return {
            message: "Section(s) added",
            newData
        }
    },

    deleteSectionsFromTeacher: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const sections = body.sections.split(",").map(Number)
        const teacher_id = Number(body.teacher_id)
        
        const result = deleteSectionsFromTeacher(sections, teacher_id);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const newData = getTeacherSections(teacher_id)

        return {
            message: "Section(s) added",
            newData
        }
    }
};