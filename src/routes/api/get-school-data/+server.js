import { json } from '@sveltejs/kit';
import { getSchoolStudentCount, getSchoolTeacherCount, getSchoolSectionCount } from '$lib/server/db/index.js';

export async function GET({ url }) {
    const school_id = Number(url.searchParams.get('id'));

    const student_count = getSchoolStudentCount(school_id);
    const teacher_count = getSchoolTeacherCount(school_id);
    const section_count = getSchoolSectionCount(school_id);

    return json({
        student_count: student_count.student_count, 
        teacher_count: teacher_count.teacher_count, 
        section_count: section_count.section_count
    });
}