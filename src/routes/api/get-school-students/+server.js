import { json } from '@sveltejs/kit';
import { getSchoolStudentsExcludeSection } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const schoolID = Number(url.searchParams.get('id'));
    const sectionID = Number(url.searchParams.get('section'));

    const users = getSchoolStudentsExcludeSection(schoolID, sectionID);

    return json(users);
}