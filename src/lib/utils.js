
export const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

export const templates = [
    {
        filename: "Schools.csv",
        headers: ["School ID", "School Name", "Initials"]
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
            type: "unexpected file",
            message: "File name does not match template name. Rename the file and try uploading again."
        });
        results.isValid = false;
        return results;
    }

    // Validate headers
    const headers = data[0];
    if (!arraysEqual(headers, template.headers)) {
        results.errors.push({
            type: "Header mismatch",
            message: `Expected: ${template.headers.join(", ")}. Check your form and try uploading again.`
        });
        results.isValid = false;
    }

    return results;
}

function arraysEqual(arr1, arr2) {
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.length === sorted2.length && sorted1.every((val, index) => val === sorted2[index]);
}