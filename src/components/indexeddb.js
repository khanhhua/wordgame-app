import {openDB} from 'idb';

const DB_NAME = 'WordGame';
export const TBL_SESSIONS = 'sessions';
export const TBL_TERMS = 'terms';

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
};

export const getDb = async () => {
    if (db) {
        return db;
    }

    await init();
    return db;
}
