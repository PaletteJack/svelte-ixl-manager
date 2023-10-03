import { getAllSchools } from '$lib/server/db/index.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const schools = getAllSchools();

    return {
        schools
    }
}