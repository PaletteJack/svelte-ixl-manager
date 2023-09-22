import { arraysEqual } from "./utils.js"

export const templates = [
    {
        filename: "Schools.csv",
        headers: ["School ID", "School Name", "Initials", "License Type"]
    },
    {
        filename: "Grades.csv",
        headers: ["Value", "Name"]
    },
    {
        filename: "Teachers.csv",
        headers: ["School ID", "Teacher ID", "Last Name", "First Name", "Email", "Username"]
    },
    {
        filename: "Students.csv",
        headers: ["School ID", "Student ID", "Student Number", "Last Name", "First Name", "Grade", "Email", "Username"]
    },
    {
        filename: "Sections.csv",
        headers: ["School ID", "Section ID", "Name", "Subject", "Grade"]
    },
    {
        filename: "Section-Assignments.csv",
        headers: ["Teacher ID", "Section ID"]
    },
    {
        filename: "Enrollments.csv",
        headers: ["Section ID", "Student ID"]
    },
]

export function validateCSV(filename, data) {
    const results = {
        errors: [],
        isValid: true
    };

    const template = templates.find(t => t.filename === filename);
    if (!template) {
        console.log("No template!");
        results.errors.push({
            type: "Unexpected file",
            message: "File name does not match template name. Rename the file and try uploading again."
        });
        results.isValid = false;
        return results;
    }

    // Validate headers
    const headers = data;
    if (!arraysEqual(headers, template.headers)) {
        results.errors.push({
            type: "Header mismatch",
            message: `Expected: ${template.headers.join(", ")}. Check your form and try uploading again.`
        });
        results.isValid = false;
    }

    return results;
}

export const validateRow = (file, row) => {
    let headers;

    switch(file) {
        case'Schools.csv':
            headers = [
                { name: "School ID", type: "number" },
                { name: "School Name", type: "string" },
                { name: "Initials", type: "string" },
                { name: "License Type", type: "string" }];
            break;
        case'Grades.csv':
            headers = [{name: "Value", type: "string"}, {name: "Name", type: "string"}];
            break;
        case'Teachers.csv':
            headers = [
                { name: "School ID", type: "number" },
                { name: "Teacher ID", type: "string" },
                { name: "Last Name", type: "string" },
                { name: "First Name", type: "string" },
                { name: "Email", type: "string" },
                { name: "Username", type: "string" }];
            break;
        case'Students.csv':
            headers = [
                { name: "School ID", type: "number" },
                { name: "Student ID", type: "string" },
                { name: "Student Number", type: "string" },
                { name: "Last Name", type: "string" },
                { name: "First Name", type: "string" },
                { name: "Grade", type: "string" },
                { name: "Email", type: "string" },
                { name: "Username", type: "string" }];
            break;
        case'Sections.csv':
            headers = [
                { name: "School ID", type: "number" },
                { name: "Section ID", type: "string" },
                { name: "Name", type: "string" },
                { name: "Subject", type: "string" },
                { name: "Grade", type: "string" }];
            break;
        case'Section-Assignments.csv':
            headers = [{name: "Teacher ID", type: "string"}, {name: "Section ID", type: "string"}];
            break;
        case'Enrollments.csv':
            headers = [{name: "Section ID", type: "string"}, {name: "Student ID", type: "string"}];
            break;
        default:
            console.error("Could not find headers for associated file.");
            break;
    }

    const results = new Validator(headers, row).validateData();
    return results
}

class Validator {
    constructor(headers, row) {
        this.headers = headers;
        this.row = row;
        this.headerLength = headers.length;
        this.rowLength = row.length;
        this.validationErrors = [];
        this.GRADE_VALUES = new Set(["PK", "K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "A1", "PC", "G", "A2", "C"]);
    }

    validateData(){
        if (this.headerLength !== this.rowLength) {
            this.validationErrors.push({
                type: "length error",
                message: `Incorrect number of entries in row. headers: ${this.row[0]}`
            })
            return this.validationErrors;
        }

        for (let i = 0; i < this.rowLength; i++) {
            if (this.row[i] === null || this.row[i] === undefined || this.row[i] === "") {
                if (this.headers[i].name !== "Subject") {
                    this.validationErrors.push({ type: "null value", message: `Missing value in column ${this.headers[i].name}` });
                }
            }
    
            if (typeof this.row[i] !== this.headers[i].type) {
                
                if (this.headers[i].name === "Value" || this.headers[i].name === "Grade") {
                    this.validateGrade(this.row[i]);
                } else if (this.headers[i].name !== "Subject"){
                    this.validationErrors.push({ type: "type error", message: `${this.headers[i].name} is of an incorrect type: ${typeof this.row[i]}. Expected ${this.headers[i].type}.` })
                }
            }

            if (this.headers[i].name === "Email") {
                this.validateEmail(this.row[i])
            }
        }

        return this.validationErrors;
    }

    validateGrade(value) {
        if (!this.GRADE_VALUES.has(value)) {
            this.validationErrors.push({
                type: "invalid grade",
                message: `Invalid Grade: ${value}`
            })
        }
    }

    validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            this.validationErrors.push({
                type: "invalid email",
                message: `"${email}"`
            })
        }
    }
}