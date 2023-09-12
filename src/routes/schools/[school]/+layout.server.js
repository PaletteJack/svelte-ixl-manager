

export const load = async ({ params }) => {
    const schoolID = Number(params.school)
    let schoolName;

    switch (schoolID) {
        case 1:
            schoolName = "Example School One"
            break;
        case 2:
            schoolName = "My School Two"
            break;
        case 3:
            schoolName = "Now that's what I call school vol. 3"
            break;
        default:
            schoolName = "I can't belive there's no name"
            break;
    }

    const school = {
        id: schoolID,
        name: schoolName
    }
    return { 
        school: school
    }
}