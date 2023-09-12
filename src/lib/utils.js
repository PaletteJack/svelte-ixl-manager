
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