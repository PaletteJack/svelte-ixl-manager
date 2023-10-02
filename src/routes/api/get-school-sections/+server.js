import { json } from '@sveltejs/kit';
import { getSchoolSections } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const school_id = Number(url.searchParams.get('id'));

    const sections = getSchoolSections(school_id);

    return json(sections);
}