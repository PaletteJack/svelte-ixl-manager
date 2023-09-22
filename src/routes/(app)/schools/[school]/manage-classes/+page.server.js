import { getSchoolSections } from '$lib/server/db/index.js'

export const load = async ({ params }) => {
    const schoolID = Number(params.school)
    const classes = getSchoolSections(schoolID)
    return { 
        classes
    }
}