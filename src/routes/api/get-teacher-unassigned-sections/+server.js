import { json } from '@sveltejs/kit';
import { getSchoolSectionsExcludeUnassigned } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const school_id = Number(url.searchParams.get('school_id'));
    const teacher_id = Number(url.searchParams.get('teacher_id'));

    const sections = getSchoolSectionsExcludeUnassigned(school_id, teacher_id);

    return json(sections);
}