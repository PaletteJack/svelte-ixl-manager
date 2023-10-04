import { getGrades } from '$lib/server/db';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const grades = getGrades();

    return {
        grades
    }
}