

export const load = async ({ fetch, locals: { db } }) => {

    const req = await fetch("/api/schools");
    const schools = await req.json();
    
    return {
        schools: schools
    }
}