import { getDb } from './indexeddb';

const TBL_SESSIONS = 'sessions';
const TBL_TERMS = 'terms';

export const renewSession = async () => {
  const db = await getDb();
  let cursor = await db.transaction(TBL_TERMS, 'readonly').store.openCursor();
  const terms = [];

  while (cursor) {
    terms.push(cursor.value);
    cursor = await cursor.continue();
  }

  return createSession(terms);
};

export const createSession = async (terms) => {
  const db = await getDb();
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
  await Promise.all(
    terms
      .sort(() => Math.random() - 0.5)
      .map((term, index) => {
        return tx.store.add({
          ...term,
          index,
        });
      })
  );

  await tx.done;

  return sessionId;
};

export const getSession = async (sessionId) => {
  const db = await getDb();
  const store = db.transaction(TBL_SESSIONS).objectStore(TBL_SESSIONS);
  const session = await store.get(sessionId);

  return session;
};

export const getNextTerm = async (sessionId) => {
  const db = await getDb();
  const storeSession = db
    .transaction(TBL_SESSIONS, 'readwrite')
    .objectStore(TBL_SESSIONS);
  const session = await storeSession.get(sessionId);
  const { nextWordIndex, count } = session;
  if (nextWordIndex === -1) {
    return {
      term: null,
      hasNext: false,
    };
  }
  await storeSession.put({
    ...session,
    nextWordIndex: nextWordIndex + 1 < count ? nextWordIndex + 1 : -1,
  });

  const term = await db.getFromIndex(TBL_TERMS, 'index', nextWordIndex);

  return {
    term,
    hasNext: nextWordIndex + 1 < count,
  };
};

export const updateStats = async (sessionId, entry) => {
  const db = await getDb();
  const tx = db.transaction(TBL_SESSIONS, 'readwrite');
  const storeSession = tx.objectStore(TBL_SESSIONS);
  const session = await storeSession.get(sessionId);
  await storeSession.put({
    ...session,
    corrects: session.corrects + entry.correct,
    wrongs: session.wrongs + !entry.correct,
    stats: (session.stats || []).concat(entry),
  });
  await tx.done;

  return {
    ok: true,
  };
};

export const getSessionStats = async (sessionId) => {
  const terms = [];
  const db = await getDb();
  let cursor = await db.transaction(TBL_TERMS).store.openCursor();

  while (cursor) {
    terms.push(cursor.value);
    cursor = await cursor.continue();
  }

  const session = await db.get(TBL_SESSIONS, sessionId);

  const stats = (session.stats || []).reduce(
    (acc, entry) => {
      const term = terms.find(({ word: key }) => key === entry.termId);
      const gender = term.tags.includes('MAS')
        ? 'der'
        : term.tags.includes('FEM')
        ? 'die'
        : term.tags.includes('NEU')
        ? 'das'
        : null;
      if (!gender) {
        return acc;
      }

      if (entry.correct) {
        acc[gender].corrects += 1;
      } else {
        acc[gender].wrongs += 1;
      }

      return acc;
    },
    {
      der: { corrects: 0, wrongs: 0 },
      die: { corrects: 0, wrongs: 0 },
      das: { corrects: 0, wrongs: 0 },
    }
  );

  return stats;
};