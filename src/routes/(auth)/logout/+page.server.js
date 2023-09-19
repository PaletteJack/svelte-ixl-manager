import { deleteSession } from '$lib/server/db/sessions.js';
import { redirect } from '@sveltejs/kit';


export const load = ({ cookies }) => {
    const sid = cookies.get('sid');
    if (sid) {
        cookies.delete('sid');
        deleteSession(sid);
    }

    throw redirect(303, "/login")
}