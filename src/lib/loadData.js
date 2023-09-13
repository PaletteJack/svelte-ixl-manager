// import fs from 'fs';

// const csvs = [
//     'Schools.csv',
//     'Grades.csv',
//     'Teachers.csv',
//     'Students.csv',
//     'Sections.csv',
//     'Section-Assignments.csv',
//     'Enrollments.csv',
// ];

// csvs.forEach((item) => {
//     let insertFunction;

//     const fileContent = fs.readFileSync(`./csvs/${item}`, 'utf8')

//     parse(fileContent, {
//         header: true,
//         dynamicTyping: true,
//         skipEmptyLines: true,
//         complete: function(results) {
//             results.data.forEach(row => {
//                 insertFunction(row)
//             });
//         }
//     })
// })

// export function insertSchool(row, db) {
//     const { school_name, initials} = row
//     const school_id = Number(row.school_id)

//     try {
//         db.prepare(`
//         insert or ignore into school (school_id, name, initials)
//         values (?, ?, ?)
//         `).run(school_id, school_name, initials)
//     } catch (error) {
//         console.log(`Problem with school: ${error.message}. School: ${school_name}`);
//     }
// }

// export function insertGrade(row, db) {
//     const { value, name } = row

//     try {
//         db.prepare(`
//         insert or ignore into grade (value, name)
//         values (?, ?)
//         `).run(value, name)
//     } catch (error) {
//         console.log(`Problem with grade: ${error.message}. Grade: ${name}`);
//     }

// }

// export function insertTeacher(row, db) {
//     const { school_id, teacher_id, last_name, first_name, email, username } = row

//     try {
//         const school = db.prepare(`
//         select id from school
//         where school_id = ?
//         `).get(school_id)

//         db.prepare(`
//         insert or ignore into teacher (teacher_id, school_id, first_name, last_name, email, username)
//         values (?, ?, ?, ?, ?, ?)
//         `).run(teacher_id, school.id, first_name, last_name, email, username)
//     } catch (error) {
//         console.log(`Problem with teacher: ${error.message}. Teacher: ${first_name} ${last_name} - ${teacher_id}`);
//     }

// }

// export function insertStudent(row, db) {
//     const { school_id, student_id, student_number, last_name, first_name, grade, student_email, username } = row

//     try {
//         const school = db.prepare(`
//         select id from school
//         where school_id = ?
//         `).get(school_id)
    
//         const grade_level = db.prepare(`
//         select id from grade
//         where value = ?
//         `).get(grade)

//         db.prepare(`
//         insert or ignore into student (student_id, student_number, school_id, first_name, last_name, grade_id, email, username)
//         values (?, ?, ?, ?, ?, ?, ?, ?)
//         `).run(student_id, student_number, school.id, first_name, last_name, grade_level.id, student_email, username)
//     } catch (error) {
//         console.log(`Problem with student: ${error.message}. Student: ${first_name} ${last_name} - ${student_id}`);
//     }

// }

// export function insertSection(row, db) {
//     const { school_id, section_id, name, subject, grade } = row

//     try {
//         const school = db.prepare(`
//         select id from school
//         where school_id = ?
//         `).get(school_id)
    
//         const grade_level = db.prepare(`
//         select id from grade
//         where value = ?
//         `).get(grade)

//         db.prepare(`
//         insert or ignore into section (section_id, school_id, name, subject, grade_id)
//         values (?, ?, ?, ?, ?)
//         `).run(section_id, school.id, name, subject, grade_level.id)
//     } catch (error) {
//         console.log(`Problem with section: ${error.message}. Section: ${section_id}`);
//     }

// }

// export function insertSectionTeachers(row, db) {
//     const { teacher_id, section_id } = row

//     try {
//         const teacher = db.prepare(`
//         select id from teacher
//         where teacher_id = ?
//         `).get(teacher_id)
    
//         const section = db.prepare(`
//         select id from section
//         where section_id = ?
//         `).get(section_id)

//         db.prepare(`
//         insert or ignore into sectionteacher ( teacher_id, section_id )
//         values (?, ?)
//         `).run(teacher.id, section.id)
//     } catch (error) {
//         console.log(`Problem with section assignment: ${error.message}. Assignment: ${teacher_id} -> ${section_id}`);
//     }

// }

// export function insertEnrollments(row, db) {
//     const { section_id, student_id } = row

//     try {
//         const student = db.prepare(`
//         select id from student
//         where student_id = ?
//         `).get(student_id)
        
//         if (!student) {
//             console.log(`we don't have a student: ${student_id}`);
//         }
    
//         const section = db.prepare(`
//         select id from section
//         where section_id = ?
//         `).get(section_id)

//         if (!section) {
//             console.log(`we don't have a section: ${section_id}`);
//         }

//         db.prepare(`
//         insert or ignore into enrollment ( section_id, student_id )
//         values (?, ?)
//         `).run(section.id, student.id)

//     } catch (error) {
//         console.log(`Problem with enrollment: ${error.message}. Enrollment: ${student_id} -> ${section_id}`);
//     }

// }