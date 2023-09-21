import { createUser, checkLogin, checkUserCount } from '$lib/server/db/index.js';
import { performLogin } from '$lib/server/db/sessions.js';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const userCount = checkUserCount();

    if (userCount == 0) {
        throw redirect(301, "/login/create-super-user");
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const body = Object.fromEntries(await request.formData());
        const { username } = body;
        const results = await checkLogin(body);

        if (results.valid) {
            performLogin(cookies, username);
            throw redirect(302, "/");
        }

        return fail(400, { message: `${results.message}` });
    },
    createAccount: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const results = await createUser(body);

        if (results.valid) {
            throw redirect(302, "/");
        }

        return fail(400, {message: `${results.message}` });
    },
};