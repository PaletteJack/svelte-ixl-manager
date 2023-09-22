import { getSchool } from '$lib/server/db/index.js';

export const load = async ({ params }) => {
    const schoolID = Number(params.school)
    const school = await getSchool(schoolID)
    return { 
        school
    }
}