import { openDB } from 'idb';

const DB_NAME = 'WordGame';
const TBL_SESSIONS = 'sessions';
const TBL_TERMS = 'terms';
let db = null;

export const init = async () => {
    db = await openDB(DB_NAME, 4, {
        upgrade(db) {
            db.createObjectStore(TBL_SESSIONS, {
               keyPath: 'id',
            });
            db.createObjectStore(TBL_TERMS, {
                keyPath: 'id',
            }).createIndex('index', 'index');
        },
    });
}

export const createSession = async (terms) => {
    const txSession = db.transaction(TBL_SESSIONS, 'readwrite');
    const sessionId = Date.now().toString();
    await Promise.all([
        txSession.store.add({
            id: sessionId,
            corrects: 0,
            wrongs: 0,
            count: terms.length,
            nextWordIndex: 0,
        }),
        txSession.done,
    ]);

    const tx = db.transaction(TBL_TERMS, 'readwrite');
    await tx.store.clear();
    await Promise.all(terms.sort(() => Math.random() - 0.5).map((term, index) => {
        return tx.store.add({
            ...term,
            index,
        });
    }));

    await tx.done;

    return sessionId;
};

export const getSession = async (sessionId) => {
    const store = db.transaction(TBL_SESSIONS).objectStore(TBL_SESSIONS);
    const session = await store.get(sessionId);

    return session;
}

export const getNextTerm = async (sessionId) => {
    const storeSession = db.transaction(TBL_SESSIONS, 'readwrite').objectStore(TBL_SESSIONS);
    const session = await storeSession.get(sessionId);
    const { nextWordIndex, count } = session;
    if (nextWordIndex === -1) {
        return null;
    }
    await storeSession.put({
        ...session,
        nextWordIndex: (nextWordIndex + 1) < count ? nextWordIndex + 1 : -1,
    });

    const term = await db.getFromIndex(TBL_TERMS, 'index', nextWordIndex);

    return {
        term,
        hasNext: (nextWordIndex + 1) < count,
    };
};

export const updateStats = async (sessionId) => {
    return {
        ok: true,
    };
}
