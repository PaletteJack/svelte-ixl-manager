import { json } from '@sveltejs/kit';
import { getTeachersAndStudents } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const section_id = Number(url.searchParams.get('id'));

    const users = getTeachersAndStudents(section_id);

    return json(users);
}