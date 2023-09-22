import { getSchoolsWithCount } from '$lib/server/db/index.js';

export const load = async ({  }) => {

    const results = await getSchoolsWithCount();
    const schools = results.schools
    const licenseCount = results.license_count
    return {
        schools,
        licenseCount
    }
}