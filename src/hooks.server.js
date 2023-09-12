
import { db } from './lib/server/db/init';

export const handle = async ({ event, resolve }) => {

    event.locals.db = db
    
    const response = await resolve(event)
    return response;
}