import { getSchoolSections } from '$lib/server/db/index.js'

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
    const schoolID = Number(params.school)
    const classes = getSchoolSections(schoolID)
    return { 
        classes
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addSection: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        console.log(body);
    },

    deleteSections: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        console.log(body);
    }
};