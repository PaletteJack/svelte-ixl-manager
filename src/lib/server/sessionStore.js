const { randomBytes } = await import ('node:crypto')

const sessionStore = new Map();


function getSID() {
    return randomBytes(32).toString('hex');
}

let nextClean = Date.now() + 1000 *60 * 60

function clean() {
    const now = Date.now();
    for (const {sid, session} of sessionStore) {
        if (session.invalidAt < now) {
            sessionStore.delete(sid);
        }
    }

    nextClean = Date.now() + 1000 * 60 * 60
}

export const createSession = (username, maxAge) => {
    let sid = '';

    do {
        sid = getSID();
    } while (sessionStore.has(sid));

    sessionStore.set(sid, {
        username,
        invalidAt: Date.now() + maxAge
    });

    if (Date.now() > nextClean) {
        setTimeout(() => {
            clean();
        }, 5000)
    }

    return sid;
}