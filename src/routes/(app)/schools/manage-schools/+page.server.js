import { getAllSchools, deleteSchool, createNewSchool } from '$lib/server/db/index.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const schools = getAllSchools();

    return {
        schools
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addSchool: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const result = createNewSchool(body);
        
        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "School created"
        }
    },

    deleteSchool: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const school_id = Number(body.school)

        const result = deleteSchool(school_id)

        if (result) {
            return fail(400, {
                message: `Error: ${result.error}`
            })
        }

        return {
            message: "School deleted"
        }
    }
};