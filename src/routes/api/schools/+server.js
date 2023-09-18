import { json } from "@sveltejs/kit"

export async function GET({ request, cookies, locals: { db } }) {
    const stmt = db.prepare(`
    select
        s.school_id,
        s.name as school_name,
        count(st.student_id) as student_count
    from
        school s
    left outer join
        student st on s.id = st.school_id
    group by
        s.school_id, s.name
    `)
    const schools = stmt.all();

    return json(schools);
}

export async function POST({ request, cookies }) {

} 