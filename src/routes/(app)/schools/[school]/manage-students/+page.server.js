import { getSchoolStudents } from '$lib/server/db';
import { getGrades, createNewStudent, deleteStudents, assignSectionToStudent, getStudentSections, deleteSectionsFromStudent } from '$lib/server/db/index.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const schoolID = Number(params.school)
    const students = getSchoolStudents(schoolID)
    const grades = getGrades();
    return { 
        students,
        streamed: {
            grades
        }
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addStudent: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const result = createNewStudent(body)

        if (result) {
            console.log(result);
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Student Added"
        }
    },

    deleteStudents: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const student_ids = body.students.split(',').map(Number)

        const result = deleteStudents(student_ids)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Student(s) deleted"
        }
    },

    addSectionToStudent: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const sections = body.sections.split(",").map(Number)
        const student_id = Number(body.student_id)

        const result = assignSectionToStudent(sections, student_id);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const newData = getStudentSections(student_id)

        return {
            message: "Section(s) added",
            newData
        }
    },

    deleteSectionsFromStudent: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const sections = body.sections.split(",").map(Number)
        const student_id = Number(body.student_id)
        
        const result = deleteSectionsFromStudent(sections, student_id);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const newData = getStudentSections(student_id)

        return {
            message: "Section(s) added",
            newData
        }
    }
};