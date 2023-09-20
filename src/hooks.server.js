
import { redirect } from '@sveltejs/kit';
import db from './lib/server/db/init.js';
import { getSession } from './lib/server/db/sessions.js';

export const handle = async ({ event, resolve }) => {
    const { cookies } = event;
    const sid = cookies.get('sid');
    event.locals.db = db;

    if (sid) {
        const session = getSession(sid);
        if (session) {
            event.locals.username = session.username
        }
    }

    const atLogin = !event.url.pathname.startsWith('/login')

    if (atLogin) {
        if (!sid || !event.locals.username) {
            throw redirect('301', "/login")
        }
    }
    
    const response = await resolve(event)
    return response;
}