import db from './init';
const { randomBytes } = await import ('node:crypto')

function getSID() {
    let sid;
    do {
        sid = randomBytes(32).toString('hex');
    } while (db.prepare('select sid from session where sid = ?').get(sid));
    return sid;
}

let nextClean = Date.now() + 1000 *60 * 60;

function clean() {
    const now = Date.now();
    db.prepare(`
    delete from session
    where invalidAt < ?
    `).run(now)

    nextClean = Date.now() + 1000 * 60 * 60
}

export const createSession = (username, maxAge) => {
    let sid = getSID();
    const invalidAt = Date.now() + maxAge;

    try {
        db.prepare(`
        insert into session (sid, username, invalidAt)
        values(?, ?, ?)
        `).run(sid, username, invalidAt)
    } catch (err) {
        console.error("Error creating session: ", err);
    }

    if (Date.now() > nextClean) {
        setTimeout(() => {
            clean();
        }, 5000)
    }

    return sid;
}

export function getSession(sid) {
    const stmt = db.prepare(`
    select * from session
    where sid = ?
    `)

    const session = stmt.get(sid);
    
    if (session) {
        if (Date.now() > session.invalidAt) {
            deleteSession(sid);
            return undefined;
        } else {
            return session;
        }
    }

    return undefined;
}

export function deleteSession(sid) {
    try {
        db.prepare(`
        delete from session
        where sid = ?
        `).run(sid)
    } catch (err) {
        console.error("Error deleting session: ", err);
    }
}

export const performLogin = (cookies, username) => {
    const maxAge = 60 * 60 * 24 * 30;
    const sid = createSession(username, maxAge)
    cookies.set(`sid`, sid, {maxAge: maxAge})
}