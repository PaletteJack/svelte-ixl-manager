import { json } from '@sveltejs/kit';
import { getSchoolTeachers } from '$lib/server/db/index.js';

export async function POST({ request }) {
    const { id } = await request.json();
    const school_id = Number(id);

    const users = getSchoolTeachers(school_id);

    return json(users);
}