import {getDb, TBL_SESSIONS} from './indexeddb';

export const getLocalReports = async ({weekly, worst, histogram}) => {
    let stats = [];
    const db = await getDb();
    let cursor = await db.transaction(TBL_SESSIONS).store.openCursor();
    while (cursor) {
        if (cursor.value.stats) {
            stats = stats.concat(cursor.value.stats);
        }
        cursor = await cursor.continue();
    }

    const worstPerformers = Object.entries(stats.reduce((acc, { termId, correct, seconds }) => {
        const key = termId;
        if (!(key in acc)) {
            acc[key] = { correct_count: 0, seconds_correct: 0, total_count: 0, total_seconds: 0 };
        }
        const entry = acc[key];

        if (correct) {
            entry.correct_count += 1
            entry.seconds_correct += seconds;
        }
        entry.total_count += 1;
        entry.total_seconds += seconds;

       return acc;
    }, {}))
        .map(([key, { correct_count, total_count, seconds_correct, total_seconds }]) => ({
            word: key,
            correct_factor: Math.round(100 * correct_count / (total_count * 1.0)) / 100,
            confidence_factor: Math.round(100 * seconds_correct / (total_seconds * 1.0)) / 100,
        }))
        .sort(({ correct_factor: a }, { correct_factor: b }) => a - b)
        .slice(0, 20);

    const histogramData = Object.entries(stats.reduce((acc, { correct, seconds }) => {
        const key = Math.floor(seconds);
        if (!(key in acc)) {
            acc[key] = { correct_count: 0, wrong_count: 0 };
        }
        let entry = acc[key];
        if (correct) {
            entry.correct_count += 1;
        } else {
            entry.wrong_count += 1;
        }

        return acc;
    }, {}))
        .map(([key, entry]) => ({ seconds: key, ...entry }))
        .sort(({ seconds: a }, { seconds: b }) => a - b);

    return {
        worstPerformers,
        weeklyPerformance: [],
        histogram: histogramData,
    };
};
