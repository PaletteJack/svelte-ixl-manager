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
    let { first_name, last_name } = data;
    const { password } = data;
    first_name = first_name.trim()
    last_name = last_name.trim()
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
    const { password } = data;
    let { first_name, last_name } = data;
    first_name = first_name.trim()
    last_name = last_name.trim()
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
    select * from school
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

export const getSchoolStudentCount = (id) => {
    const stmt = db.prepare(`
    select count(*) as student_count
    from student
    where school_id = ?
    `)

    const count = stmt.get(id)

    return count;
}

export const getSchoolTeacherCount = (id) => {
    const stmt = db.prepare(`
    select count(*) as teacher_count
    from teacher
    where school_id = ?
    `)

    const count = stmt.get(id)

    return count;
}

export const getSchoolSectionCount = (id) => {
    const stmt = db.prepare(`
    select count(*) as section_count
    from section
    where school_id = ?
    `)

    const count = stmt.get(id)

    return count;
}

export const deleteSchool = (id) => {
    const stmt = db.prepare(`
    delete from school where id = ?
    `)

    try {
        stmt.run(id)
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const createNewSchool = (obj) => {
    const { name, initials, license_type} = obj;
    const license_cap = Number(obj.license_cap)
    const school_id = Number(obj.school_id)

    const stmt = db.prepare(`
    insert into school(school_id, name, initials, license_type, license_cap)
    values (?, ?, ?, ?, ?)
    `)

    try {
        stmt.run(school_id, name, initials, license_type, license_cap)
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
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

export const getSchoolSectionsExcludeUnassigned = (school_id, teacher_id) => {
    const stmt = db.prepare(`
    select 
    DISTINCT section.*,
    grade.id as grade_id,
    grade.name as grade_name,
    grade.value as grade_value
    from section
    join grade on section.grade_id = grade.id
    where section.school_id = ? 
    and NOT EXISTS (
        select 1 from sectionteacher 
        where sectionteacher.section_id = section.id 
        and sectionteacher.teacher_id = ?
    )
    `)

    const sections = stmt.all(school_id, teacher_id)

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

export const createNewSection = (obj) => {
    const { section_id, section_name, subject } = obj;
    const grade_id = Number(obj.grade)
    const school_id = Number(obj.school)

    const stmt = db.prepare(`
    insert into section(section_id, school_id, name, subject, grade_id)
    values (?, ?, ?, ?, ?)
    `)

    try {
        stmt.run(section_id, school_id, section_name, subject, grade_id)
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const deleteSections = (form_ids) => {
    const deletion = db.prepare(`delete from section where id = ?`);

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(id);
    });

    try {
        deleteMany(form_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
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

export const getSchoolTeachersExcludeSection = (school_id, section_id) => {
    const stmt = db.prepare(`
    select teacher.*
    from teacher
    left join sectionteacher on teacher.id = sectionteacher.teacher_id and sectionteacher.section_id = ?
    where teacher.school_id = ? and sectionteacher.section_id is null
    `)

    const teachers = stmt.all(section_id, school_id)

    return teachers;
}

export const addTeachersToSection = (section_id, teacher_ids) => {
    const insert = db.prepare(`
    insert into sectionteacher(section_id, teacher_id)
    values (?, ?)
    `)

    const insertMany = db.transaction((ids) => {
        for (const id of ids) insert.run(section_id, id);
    });

    try {
        insertMany(teacher_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null;
}

export const deleteTeachersFromSection = (section_id, teacher_ids) => {
    const deletion = db.prepare(`
    delete from sectionteacher 
    where section_id = ?
    and teacher_id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(section_id, id)
    })

    try {
        deleteMany(teacher_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const getTeacherSections = (id) => {
    const stmt = db.prepare(`
    select s.*, g.name as grade_name
    from section s
    join sectionteacher st on s.id = st.section_id
    join teacher t on t.id = st.teacher_id
    join grade g on g.id = s.grade_id
    where t.id = ?
    `)

    const sections = stmt.all(id)

    return sections
}

export const createNewTeacher = (formData) => {
    let { first_name, last_name, email } = formData;
    first_name = first_name.trim()
    last_name = last_name.trim()
    email = email.trim()
    const school_id = Number(formData.school)
    const username = formData.username || email
    const teacher_id = formData.teacher_id || email

    const stmt = db.prepare(`
    insert into teacher(teacher_id, school_id, first_name, last_name, email, username)
    values (?, ?, ?, ?, ?, ?)
    `)

    try {
        stmt.run(teacher_id, school_id, first_name, last_name, email, username)
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const deleteTeachers = (teacher_ids) => {
    const deletion = db.prepare(`
    delete from teacher
    where id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(id)
    })

    try {
        deleteMany(teacher_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const assignSectionToTeacher = (section_ids, teacher_id) => {
    const insert = db.prepare(`
    insert into sectionteacher(section_id, teacher_id)
    values (?, ?)
    `)

    const insertMany = db.transaction((ids) => {
        for (const id of ids) insert.run(id, teacher_id);
    });

    try {
        insertMany(section_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null;
}

export const deleteSectionsFromTeacher = (section_ids, teacher_id) => {
    const deletion = db.prepare(`
    delete from sectionteacher 
    where section_id = ?
    and teacher_id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(id, teacher_id)
    })

    try {
        deleteMany(section_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

/* ----------------- Students ----------------- */

export const createNewStudent = (formData) => {
    let { first_name, last_name, email } = formData;
    first_name = first_name.trim()
    last_name = last_name.trim()
    email = email.trim()
    const school_id = Number(formData.school)
    const username = formData.username || email
    const student_number = formData.student_number || email
    const grade = Number(formData.grade)
    const student_id = formData.student_id || email

    const stmt = db.prepare(`
    insert into student(student_id, student_number, school_id, first_name, last_name, grade_id, email, username)
    values (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    try {
        stmt.run(student_id, student_number, school_id, first_name, last_name, grade, email, username)
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

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

export const getStudentSections = (id) => {
    const stmt = db.prepare(`
    select s.*, g.name as grade_name
    from section s
    join enrollment e on s.id = e.section_id
    join student st on st.id = e.student_id
    join grade g on g.id = s.grade_id
    where st.id = ?
    `)

    const sections = stmt.all(id)

    return sections
}

export const getSchoolStudentsExcludeSection = (school_id, section_id) => {
    const stmt = db.prepare(`
    select student.*
    from student
    left join enrollment on student.id = enrollment.student_id and enrollment.section_id = ?
    where student.school_id = ? and enrollment.section_id is null
    `)

    const students = stmt.all(section_id, school_id)

    return students;
}

export const deleteStudents = (student_ids) => {
    const deletion = db.prepare(`
    delete from student
    where id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(id)
    })

    try {
        deleteMany(student_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const addEnrollment = (section_id, student_ids) => {
    const insert = db.prepare(`
    insert into enrollment(section_id, student_id)
    values (?, ?)
    `)

    const insertMany = db.transaction((ids) => {
        for (const id of ids) insert.run(section_id, id);
    });

    try {
        insertMany(student_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null;
}

export const deleteStudentsFromEnrollment = (section_id, student_ids) => {
    const deletion = db.prepare(`
    delete from enrollment 
    where section_id = ?
    and student_id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(section_id, id)
    })

    try {
        deleteMany(student_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

export const getStudentSectionsExcludeUnassigned = (school_id, student_id) => {
    const stmt = db.prepare(`
    select 
    DISTINCT section.*,
    grade.id as grade_id,
    grade.name as grade_name,
    grade.value as grade_value
    from section
    join grade on section.grade_id = grade.id
    where section.school_id = ? 
    and NOT EXISTS (
        select 1 from enrollment 
        where enrollment.section_id = section.id 
        and enrollment.student_id = ?
    )
    `)

    const sections = stmt.all(school_id, student_id)

    return sections;
}

export const assignSectionToStudent = (section_ids, student_id) => {
    const insert = db.prepare(`
    insert into enrollment(section_id, student_id)
    values (?, ?)
    `)

    const insertMany = db.transaction((ids) => {
        for (const id of ids) insert.run(id, student_id);
    });

    try {
        insertMany(section_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null;
}

export const deleteSectionsFromStudent = (section_ids, student_id) => {
    const deletion = db.prepare(`
    delete from enrollment 
    where section_id = ?
    and student_id = ?
    `)

    const deleteMany = db.transaction((ids) => {
        for (const id of ids) deletion.run(id, student_id)
    })

    try {
        deleteMany(section_ids);
    } catch (err) {
        return {
            error: err.code
        }
    }

    return null
}

/* ----------------- Grades ----------------- */

export const getGrades = () => {
    const stmt = db.prepare(`
    select * from grade
    `)

    const sections = stmt.all()

    return sections;
}