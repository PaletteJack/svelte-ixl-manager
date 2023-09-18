import Papa from 'papaparse'
import { insertEnrollments, insertGrade, insertSchool, insertSection, insertSectionTeachers, insertStudent, insertTeacher } from '$lib/server/db/loadData';


/** @type {import('./$types').Actions} */
export const actions = {
    submitFiles: async ({ request, locals: { db }}) => {
        const formData = await request.formData();
        const files = await formData.getAll('csvs');
        const fileOrder = [
            'Schools.csv',
            'Grades.csv',
            'Teachers.csv',
            'Students.csv',
            'Sections.csv',
            'Section-Assignments.csv',
            'Enrollments.csv'
        ];
        let insertFunction;
        let insertErrors = [];
        files.sort((a, b) => {
            return fileOrder.indexOf(a.name) - fileOrder.indexOf(b.name);
        })

        files.forEach(async (file) => {
            const content = await file.text();
            switch(file.name) {
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

            Papa.parse(content, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    results.data.forEach(row => {
                        insertFunction(row, db, insertErrors);
                    });
                }
            });

        })

        return {
            complete: true,
            errors: insertErrors
        }
    },
};
