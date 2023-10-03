import { json } from '@sveltejs/kit';
import { getStudentSections } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const studentID = Number(url.searchParams.get('id'));

    const userData = getStudentSections(studentID);

    return json(userData);
}