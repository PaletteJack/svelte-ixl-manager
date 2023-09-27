import { getSchoolSections, getGrades, createNewSection, deleteSections } from '$lib/server/db/index.js'
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
                message: result.error
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
                message: result.error
            })
        }

        return {
            message: "Section(s) deleted"
        }
        
    },

    addTeacherToSection: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        console.log(body);
    }
};