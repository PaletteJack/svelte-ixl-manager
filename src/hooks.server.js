
import db from './lib/server/db/init.js';
import { getSession } from './lib/server/db/sessions.js';

export const handle = async ({ event, resolve }) => {
    const { cookies } = event;
    const sid = cookies.get('sid');

    if (sid) {
        const session = getSession(sid);
        if (session) {
            event.locals.username = session.username
        }
    }
    event.locals.db = db;
    
    const response = await resolve(event)
    return response;
}