import Papa from 'papaparse'
import { insertEnrollments, insertGrade, insertSchool, insertSection, insertSectionTeachers, insertStudent, insertTeacher } from '../../lib/loadData';


/** @type {import('./$types').Actions} */
export const actions = {
    submitFiles: async ({ request, locals: { db }}) => {
        // const formData = await request.formData()
        // const files = formData.getAll('csvs');
        // let insertFunction;

        // for (const file of files) {

        //     switch(item) {
        //         case'Schools.csv':
        //             insertFunction = insertSchool;
        //             break;
        //         case'Grades.csv':
        //             insertFunction = insertGrade;
        //             break;
        //         case'Teachers.csv':
        //             insertFunction = insertTeacher;
        //             break;
        //         case'Students.csv':
        //             insertFunction = insertStudent;
        //             break;
        //         case'Sections.csv':
        //             insertFunction = insertSection;
        //             break;
        //         case'Section-Assignments.csv':
        //             insertFunction = insertSectionTeachers;
        //             break;
        //         case'Enrollments.csv':
        //             insertFunction = insertEnrollments;
        //             break;
        //         default:
        //             console.log("Could not find function associated with the file.");
        //             break;
        //     }
        //     const content = await file.text();
        //     Papa.parse(content, {
        //         header: true,
        //         dynamicTyping: true,
        //         skipEmptyLines: true,
        //         complete: function(results) {
        //             results.data.forEach(row => {
        //                 insertFunction(row, db);
        //             });
        //         }
        //     })
        // }
    }
};
