import { getSchoolsWithCount } from '$lib/server/db/index.js';

export const load = async ({  }) => {

    const schools = await getSchoolsWithCount();
    
    return {
        schools: schools
    }
}