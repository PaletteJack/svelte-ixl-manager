import { getSchoolSections, getGrades, createNewSection, deleteSections, addTeachersToSection, addEnrollment, deleteTeachersFromSection, deleteStudentsFromEnrollment } from '$lib/server/db/index.js'
import { fail } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
    const schoolID = Number(params.school)
    const classes = getSchoolSections(schoolID)
    const grades = getGrades()
    return { 
        classes,
        streamed: {
            grades
        }
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addSection: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const result = createNewSection(body);
        
        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Section created"
        }
    },

    deleteSections: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const ids = body.ids.split(',')
        const sectionIds = ids.map(Number)
        const result = deleteSections(sectionIds)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "Section(s) deleted"
        }
        
    },

    addTeacherToSection: async ({ request, fetch }) => {
        const body = Object.fromEntries(await request.formData());
        const section_id = Number(body.section);
        const ids = body.teachers.split(',');
        const teacher_ids = ids.map(Number);

        const result = addTeachersToSection(section_id, teacher_ids);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const req = await fetch(`/api/get-section-users?id=${section_id}`);

		const classData = await req.json();

        return {
            message: "Teacher(s) added",
            newData: classData
        }
    },

    addEnrollment: async ({ request, fetch }) => {
        const body = Object.fromEntries(await request.formData())
        const section_id = Number(body.section)
        const student_ids = body.students.split(",").map(Number)

        const result = addEnrollment(section_id, student_ids)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const req = await fetch(`/api/get-section-users?id=${section_id}`)

		const classData = await req.json();

        return {
            message: "Students(s) added",
            newData: classData
        }
    },

    deleteTeachers: async ({ request, fetch }) => {
        const body = Object.fromEntries(await request.formData())
        const section_id = Number(body.section);
        const ids = body.teachers.split(',');
        const teacher_ids = ids.map(Number);

        const result = deleteTeachersFromSection(section_id, teacher_ids);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const req = await fetch(`/api/get-section-users?id=${section_id}`)

		const classData = await req.json();

        return {
            message: "Teacher(s) unassigned",
            newData: classData
        }

    },

    deleteStudents: async ({ request, fetch }) => {
        const body = Object.fromEntries(await request.formData())
        const section_id = Number(body.section);
        const ids = body.students.split(',');
        const student_ids = ids.map(Number);

        const result = deleteStudentsFromEnrollment(section_id, student_ids);

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        const req = await fetch(`/api/get-section-users?id=${section_id}`)

		const classData = await req.json();

        return {
            message: "Students(s) unassigned",
            newData: classData
        }

    }
};