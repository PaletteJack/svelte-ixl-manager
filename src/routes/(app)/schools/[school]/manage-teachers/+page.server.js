import { getSchoolTeachers } from '$lib/server/db';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const schoolID = Number(params.school)
    const teachers = getSchoolTeachers(schoolID)
    return { 
        teachers
    }
}