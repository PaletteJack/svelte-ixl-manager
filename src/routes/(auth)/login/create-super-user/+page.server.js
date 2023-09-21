import { createSuperUser } from "$lib/server/db/index.js"
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    createSuperUser: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const results = await createSuperUser(body);

        if (results.valid) {
            throw redirect(302, "/");
        }

        return fail(400, {message: `${results.message}` });
    }
};