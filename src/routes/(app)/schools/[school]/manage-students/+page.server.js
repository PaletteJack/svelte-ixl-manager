import { getSchoolStudents } from '$lib/server/db';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const schoolID = Number(params.school)
    const students = getSchoolStudents(schoolID)
    return { 
        students
    }
}