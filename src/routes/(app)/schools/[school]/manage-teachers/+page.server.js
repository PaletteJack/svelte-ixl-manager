import { getSchoolTeachers } from '$lib/server/db';
import { createNewTeacher, deleteTeachers } from '$lib/server/db/index.js';
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
                message: result.message
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
                message: result.message
            })
        }

        return {
            message: "Teacher(s) deleted"
        }
    }
};