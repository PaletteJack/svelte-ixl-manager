import { json } from '@sveltejs/kit';
import { getTeacherSections } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const id = url.searchParams.get('id');
    const teacherID = Number(id);

    const userData = getTeacherSections(teacherID);

    return json(userData);
}