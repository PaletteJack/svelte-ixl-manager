import { json } from '@sveltejs/kit';
import { getSchoolTeachersExcludeSection } from '$lib/server/db/index.js';

export async function POST({ request }) {
    const { school_id, section_id } = await request.json();
    const schoolID = Number(school_id);
    const sectionID = Number(section_id);

    const users = getSchoolTeachersExcludeSection(schoolID, sectionID);

    return json(users);
}