import { json } from '@sveltejs/kit';
import { getSchoolStudents } from '$lib/server/db/index.js';

export async function POST({ request }) {
    const { id } = await request.json();
    const school_id = Number(id);

    const users = getSchoolStudents(school_id);

    return json(users);
}