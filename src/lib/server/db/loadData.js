

export function insertSchool(row, db, errorList) {
    const school_name = row["School Name"]
    const initials = row["Initials"]
    const license_type = row["License Type"]
    const school_id = Number(row["School ID"])
    const license_cap = Number(row["License Cap"])

    try {
        db.prepare(`
        insert or ignore into school (school_id, name, initials, license_type, license_cap)
        values (?, ?, ?, ?, ?)
        `).run(school_id, school_name, initials, license_type, license_cap)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert school -> ${school_name}: ${error.message}`
        })
    }
}

export function insertGrade(row, db, errorList) {
    const value = row["Value"]
    const name = row["Name"]

    try {
        db.prepare(`
        insert or ignore into grade (value, name)
        values (?, ?)
        `).run(value, name)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert grade -> ${name}: ${error.message}`
        })
    }

}

export function insertTeacher(row, db, errorList) {
    const school_id = Number(row["School ID"])
    const teacher_id = row["Teacher ID"]
    const last_name = row["Last Name"]
    const first_name = row["First Name"]
    const email = row["Email"]
    const username = row["Username"]

    try {
        const school = db.prepare(`
        select id from school
        where school_id = ?
        `).get(school_id)

        db.prepare(`
        insert or ignore into teacher (teacher_id, school_id, first_name, last_name, email, username)
        values (?, ?, ?, ?, ?, ?)
        `).run(teacher_id, school.id, first_name, last_name, email, username)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert teacher -> ${first_name} ${last_name}: ${error.message}`
        })
    }

}

export function insertStudent(row, db, errorList) {
    const school_id = Number(row["School ID"])
    const student_id = row["Student ID"]
    const student_number = row["Student Number"]
    const last_name = row["Last Name"]
    const first_name = row["First Name"]
    const grade = row["Grade"]
    const student_email = row["Email"]
    const username = row["Username"]

    try {
        const school = db.prepare(`
        select id from school
        where school_id = ?
        `).get(school_id)
    
        const grade_level = db.prepare(`
        select id from grade
        where value = ?
        `).get(grade)

        db.prepare(`
        insert or ignore into student (student_id, student_number, school_id, first_name, last_name, grade_id, email, username)
        values (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(student_id, student_number, school.id, first_name, last_name, grade_level.id, student_email, username)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert student -> ${first_name} ${last_name}: ${error.message}`
        })
    }

}

export function insertSection(row, db, errorList) {
    const school_id = Number(row["School ID"])
    const section_id = row["Section ID"]
    const name = row["Name"]
    const subject = row["Subject"]
    const grade = row["Grade"]

    try {
        const school = db.prepare(`
        select id from school
        where school_id = ?
        `).get(school_id)
    
        const grade_level = db.prepare(`
        select id from grade
        where value = ?
        `).get(grade)

        db.prepare(`
        insert or ignore into section (section_id, school_id, name, subject, grade_id)
        values (?, ?, ?, ?, ?)
        `).run(section_id, school.id, name, subject, grade_level.id)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert section -> ${section_id}: ${error.message}`
        })
    }

}

export function insertSectionTeachers(row, db, errorList) {
    const teacher_id = row["Teacher ID"]
    const section_id = row["Section ID"]

    try {
        const teacher = db.prepare(`
        select id from teacher
        where teacher_id = ?
        `).get(teacher_id)
    
        const section = db.prepare(`
        select id from section
        where section_id = ?
        `).get(section_id)

        db.prepare(`
        insert or ignore into sectionteacher ( teacher_id, section_id )
        values (?, ?)
        `).run(teacher.id, section.id)
    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert assignment -> ${teacher_id} to ${section_id}: ${error.message}`
        })
    }

}

export function insertEnrollments(row, db, errorList) {
    const section_id = row["Section ID"]
    const student_id = row["Student ID"]

    try {
        const student = db.prepare(`
        select id from student
        where student_id = ?
        `).get(student_id)
        
        if (!student) {
            console.log(`we don't have a student: ${student_id}`);
        }
    
        const section = db.prepare(`
        select id from section
        where section_id = ?
        `).get(section_id)

        if (!section) {
            console.log(`we don't have a section: ${section_id}`);
        }

        db.prepare(`
        insert or ignore into enrollment ( section_id, student_id )
        values (?, ?)
        `).run(section.id, student.id)

    } catch (error) {
        errorList.push({
            type: "insert error",
            message: `Could not insert enrollment -> ${student_id} to ${section_id}: ${error.message}`
        })
    }

}