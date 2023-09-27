import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const schoolID = Number(params.school)
    throw redirect(301, `/schools/${schoolID}/manage-classes`);
}