import Papa from 'papaparse'
import { insertEnrollments, insertGrade, insertSchool, insertSection, insertSectionTeachers, insertStudent, insertTeacher } from '$lib/server/db/loadData';
import { resetDatabase } from '$lib/server/db';
import { fail } from '@sveltejs/kit';


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
        });

        db.exec("begin transaction");

        for (const file of files) {
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
        }

        if (insertErrors.length > 0) {
            console.log(insertErrors);
            db.exec("rollback");
            return fail(400, {
                message: "Error inserting data. check for your form and try again.",
                errors: insertErrors
            });
        } else {
            try {
                db.exec('commit');
            } catch (error) {
                db.exec('rollback');
                insertErrors.push({
                    type: "transaction error",
                    message: `Error committing the transaction: ${error.message}`
                });
            }
        }

        return {
            message: "All records added successfully"
        }
    },

    resetDB: async ({ request, locals: { db }}) => {
        const formData = Object.fromEntries(await request.formData());
        const confirmation = formData.confirmation

        if (confirmation !== "Delete Database") {
            console.log("Not deleting database");
            return;
        }

        const result = resetDatabase();

        if (!result) {
            return {
                message: "Database has been reset."
            }
        } else {
            return fail(500, {
                message: `There was an issue resetting the database: ${result}`
            })
        }

    }
};
