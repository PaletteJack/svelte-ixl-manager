import Database from "better-sqlite3";
import pkg from "papaparse";
const { parse } = pkg;
import fs from 'fs';
const db = new Database("./data/sqlite3.db");
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
create table if not exists school (
    id integer primary key,
    school_id integer unique not null,
    name text not null,
    initials text not null
);

create table if not exists grade (
    id integer primary key,
    name text not null,
    value text not null
);

create table if not exists teacher (
    id integer primary key,
    teacher_id text unique not null,
    school_id integer,
    first_name text not null,
    last_name text not null,
    email text not null,
    username text not null,
    foreign key(school_id) references school(id) on delete cascade
);

create table if not exists student (
    id integer primary key,
    student_id text unique not null,
    student_number text not null,
    school_id integer,
    first_name text not null,
    last_name text not null,
    grade_id integer,
    email text not null,
    username text not null,
    foreign key(school_id) references school(id) on delete cascade,
    foreign key(grade_id) references grade(id) on delete cascade
);

create table if not exists section (
    id integer primary key,
    section_id text unique not null,
    school_id integer,
    name text not null,
    subject text,
    grade_id integer,
    foreign key(school_id) references school(id) on delete cascade,
    foreign key(grade_id) references grade(id) on delete cascade
);

create table if not exists sectionteacher (
    id integer primary key,
    section_id integer,
    teacher_id integer,
    foreign key(section_id) references section(id) on delete cascade,
    foreign key(teacher_id) references teacher(id) on delete cascade
);

create table if not exists enrollment (
    id integer primary key,
    section_id integer,
    student_id integer,
    foreign key(section_id) references section(id) on delete cascade,
    foreign key(student_id) references student(id) on delete cascade
);
`)

const csvs = [
    'Schools.csv',
    'Grades.csv',
    'Teachers.csv',
    'Students.csv',
    'Sections.csv',
    'Section-Assignments.csv',
    'Enrollments.csv',
];

csvs.forEach((item) => {
    let insertFunction;

    switch(item) {
        case'Schools.csv':
            insertFunction = insertSchool;
            break;
        case'Grades.csv':
            insertFunction = insertGrade;
            break;
        case'Teachers.csv':
            insertFunction = insertTeacher;
            break;
        case'Students.csv':
            insertFunction = insertStudent;
            break;
        case'Sections.csv':
            insertFunction = insertSection;
            break;
        case'Section-Assignments.csv':
            insertFunction = insertSectionTeachers;
            break;
        case'Enrollments.csv':
            insertFunction = insertEnrollments;
            break;
        default:
            console.log("Could not find function associated with the file.");
            break;
    }

    const fileContent = fs.readFileSync(`./csvs/${item}`, 'utf8')

    parse(fileContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            results.data.forEach(row => {
                insertFunction(row)
            });
        }
    })
})

function insertSchool(row) {
    const { school_name, initials} = row
    const school_id = Number(row.school_id)

    try {
        db.prepare(`
        insert or ignore into school (school_id, name, initials)
        values (?, ?, ?)
        `).run(school_id, school_name, initials)
    } catch (error) {
        console.log(`Problem with school: ${error.message}. School: ${school_name}`);
    }
}

function insertGrade(row) {
    const { value, name } = row

    try {
        db.prepare(`
        insert or ignore into grade (value, name)
        values (?, ?)
        `).run(value, name)
    } catch (error) {
        console.log(`Problem with grade: ${error.message}. Grade: ${name}`);
    }

}

function insertTeacher(row) {
    const { school_id, teacher_id, last_name, first_name, email, username } = row

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
        console.log(`Problem with teacher: ${error.message}. Teacher: ${first_name} ${last_name} - ${teacher_id}`);
    }

}

function insertStudent(row) {
    const { school_id, student_id, student_number, last_name, first_name, grade, student_email, username } = row

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
        console.log(`Problem with student: ${error.message}. Student: ${first_name} ${last_name} - ${student_id}`);
    }

}

function insertSection(row) {
    const { school_id, section_id, name, subject, grade } = row

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
        console.log(`Problem with section: ${error.message}. Section: ${section_id}`);
    }

}

function insertSectionTeachers(row) {
    const { teacher_id, section_id } = row

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
        console.log(`Problem with section assignment: ${error.message}. Assignment: ${teacher_id} -> ${section_id}`);
    }

}

function insertEnrollments(row) {
    const { section_id, student_id } = row

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
        console.log(`Problem with enrollment: ${error.message}. Enrollment: ${student_id} -> ${section_id}`);
    }

}