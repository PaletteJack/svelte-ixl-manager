import Database from "better-sqlite3";
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

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

function gracefulShutdown() {
    console.log("Closing the SQLite database.");
    db.close();
    process.exit(0);
}

export default db;