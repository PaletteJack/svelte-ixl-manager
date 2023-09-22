import { json } from "@sveltejs/kit"
import { v4 as uuidv4 } from "uuid"
import { generateUsername } from "$lib/utils"
import * as argon2 from "argon2"
import db from './init'

/* ----------------- Auth functions ----------------- */
export const checkUserCount = () => {
    const stmt = db.prepare(`
    select count(*) as count from users
    `)
    return stmt.get().count;
}

export const createUser = async (data) => {
    const stmt = db.prepare(`
    insert into users (id, first_name, last_name, display_name, username, password_hash)
    values (?, ?, ?, ?, ?, ?)
    `)

    const id = uuidv4();
    const { first_name, last_name, password } = data;
    const display_name = `${first_name} ${last_name}`;
    const username = await generateUsername(first_name, last_name);
    let password_hash;
    try {
        const hash = await argon2.hash(password);
        password_hash = hash;
    } catch (err) {
        console.log("password could not be hashed");
        return;
    }

    console.log(`ID: ${id}\nFirst Name: ${first_name}\nLast Name: ${last_name}\nDisplay Name: ${display_name}\nUsername: ${username}\nPassword Hash: ${password_hash}`);
    
    try {
        stmt.run(id, first_name, last_name, display_name, username, password_hash)
        return{
            valid: true,
        }
    } catch (err) {
        return {
            valid: false,
            type: "insert error",
            message: `Could not create account: ${err}`
        }
    }
}

export const createSuperUser = async (data) => {
    const stmt = db.prepare(`
    insert into users (id, first_name, last_name, display_name, username, password_hash, admin)
    values (?, ?, ?, ?, ?, ?, ?)
    `)

    const id = uuidv4();
    const { first_name, last_name, password } = data;
    const display_name = `${first_name} ${last_name}`;
    const username = "Admin"
    const admin = 1;
    let password_hash;
    try {
        const hash = await argon2.hash(password);
        password_hash = hash;
    } catch (err) {
        console.log("password could not be hashed");
        return;
    }

    console.log(`creating super user...\n\nID: ${id}\nFirst Name: ${first_name}\nLast Name: ${last_name}\nDisplay Name: ${display_name}\nUsername: ${username}\nPassword Hash: ${password_hash}`);
    
    try {
        stmt.run(id, first_name, last_name, display_name, username, password_hash, admin)
        return{
            valid: true,
        }
    } catch (err) {
        return {
            valid: false,
            type: "insert error",
            message: `Could not create super user account: ${err}`
        }
    }
}

export const checkLogin = async (data) => {
    const { username, password } = data;
    const stmt = db.prepare(`
    select password_hash
    from users
    where username = ? collate nocase
    `)

    const pass = await stmt.get(username);

    if (pass && pass.password_hash) {
        try {
            if (await argon2.verify(pass.password_hash, password)) {
                return {
                    valid: true
                }
            }
        } catch (err) {
            return {
                valid: false,
                type: "authentication",
                message: "incorrect password"
            }
        }
    }

    return {
        valid: false,
        type: "authentication",
        message: "Could not account for that username"
    }
}

/* ----------------- Special functions ----------------- */

export const getSchoolsWithCount = () => {
    const stmt = db.prepare(`
    select
        s.id,
        s.school_id,
        s.name as school_name,
        s.license_type,
        count(st.student_id) as student_count
    from
        school s
    left outer join
        student st on s.id = st.school_id
    group by
        s.school_id, s.name
    `)

    const licenseStmt = db.prepare(`
    select
        s.license_type,
        count(st.student_id) as student_count
    from
        school s
    left outer join
        student st on s.id = st.school_id
    group by
        s.license_type
    `)

    const schools = stmt.all();
    const license_count = licenseStmt.all();

    return {
        schools,
        license_count
    }
}

export const resetDatabase = () => {
    try {
        db.transaction(() => {
            db.prepare(`delete from section`).run()
            db.prepare(`delete from grade`).run()
            db.prepare(`delete from school`).run()
        })();
    } catch (err) {
        console.log("Error resetting databse: ", err);
        return err;
    }

    return null
}

/* ----------------- Schools ----------------- */

export const getAllSchools = () => {
    const stmt = db.prepare(`
    select id, name from school
    `)
    const schools = stmt.all();

    return schools;
}

export const getSchool = (id) => {
    const stmt = db.prepare(`
    select * from school
    where id = ?
    `)
    const school = stmt.get(id)

    return school;
}


/* ----------------- Sections ----------------- */

export const getSchoolSections = (id) => {
    const stmt = db.prepare(`
    select 
    section.*,
    grade.id as grade_id,
    grade.name as grade_name,
    grade.value as grade_value
    from section
    join grade on section.grade_id = grade.id
    where section.school_id = ?
    `)

    const sections = stmt.all(id)

    return sections;
}

export const getTeachersAndStudents = (id) => {
    const teacherStmt = db.prepare(`
    select teacher.*
    from sectionteacher
    join teacher on sectionteacher.teacher_id = teacher.id
    where sectionteacher.section_id = ?
    `);
    const teachers = teacherStmt.all(id);

    const studentStmt = db.prepare(`
    select student.*
    from enrollment
    join student on enrollment.student_id = student.id
    where enrollment.section_id = ?
    `)

    const students = studentStmt.all(id);

    return {
        teachers: teachers,
        students: students
    }

}


/* ----------------- Teachers ----------------- */

export const getSchoolTeachers = (id) => {
    const stmt = db.prepare(`
    select * from teacher
    where school_id = ?
    `)

    const teachers = stmt.all(id)

    return teachers;
}


/* ----------------- Students ----------------- */

export const getSchoolStudents = (id) => {
    const stmt = db.prepare(`
    select 
    student.*,
    grade.id as grade_id,
    grade.name as grade_name,
    grade.value as grade_value
    from student
    join grade on student.grade_id = grade.id
    where student.school_id = ?
    `)

    const students = stmt.all(id)

    return students;
}