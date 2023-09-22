import { json } from '@sveltejs/kit';
import { getTeachersAndStudents } from '$lib/server/db/index.js';

export async function POST({ request }) {
    const { id } = await request.json();
    const section_id = Number(id)

    const users = getTeachersAndStudents(section_id);

    return json(users);
}