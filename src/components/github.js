import api from './network';

async function content(url, parse) {
    const res = await api.request(url, 'GET');
    if (!res.ok) {
        throw new Error('Bad Request');
    }

    const data = await res.json();
    if (data.encoding !== 'base64') {
        throw new Error('Bad Request');
    }

    const parsed = parse(atob(data.content));
    return parsed;
}

export const getCollections = async () => {
    const url = 'https://api.github.com/repos/khanhhua/wordgame-data/contents/menschen/package.json';
    try {
        const json = await content(url, JSON.parse);
        return json.collections;
    } catch (e) {
        return [];
    }
};

export const getTermsByCollection = async ({file}) => {
    const url = `https://api.github.com/repos/khanhhua/wordgame-data/contents/menschen/${file}`;
    try {
        const words = await content(url, (decoded) => {
            return decoded.split('\n').filter(Boolean).map(line => {
                const parts = line.split(';');
                return {
                    id: parts[0],
                    word: parts[0],
                    meaning: parts[1],
                    tags: parts[2],
                };
            });
        });
        return words;
    } catch (e) {
        return [];
    }
}
