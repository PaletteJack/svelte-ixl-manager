import { json } from '@sveltejs/kit';
import { getStudentSectionsExcludeUnassigned } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const school_id = Number(url.searchParams.get('school_id'));
    const student_id = Number(url.searchParams.get('student_id'));

    const sections = getStudentSectionsExcludeUnassigned(school_id, student_id);

    return json(sections);
}