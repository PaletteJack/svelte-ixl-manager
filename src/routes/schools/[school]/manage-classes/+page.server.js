

export const load = async ({ params }) => {
    const schoolID = Number(params.school)

    const classes = [
        {
            id: 1,
            section_id: "ESN1",
            name: "My Classroom",
            grade: "1st Grade"
        },
        {
            id: 2,
            section_id: "ESN4",
            name: "Mrs. Person's 4th Grade",
            grade: "4th Grade"
        },
        {
            id: 3,
            section_id: "ESN5",
            name: "Class 5A",
            grade: "5th Grade"
        },
        {
            id: 4,
            section_id: "ESN7",
            name: "7th Grade",
            grade: "7th Grade"
        },
    ]

    return { 
        classes: classes 
    }
}