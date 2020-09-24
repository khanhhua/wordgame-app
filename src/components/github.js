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

  const escaped = decodeURIComponent(escape(atob(data.content)));
  const parsed = parse(escaped);
  return parsed;
}

export const getCollections = async () => {
  const url =
    'https://api.github.com/repos/khanhhua/wordgame-data/contents/menschen/package.json';
  try {
    const json = await content(url, JSON.parse);
    return json.collections;
  } catch (e) {
    return [];
  }
};

export const getTermsByCollection = async ({ file }, flag = null) => {
  const url = `https://api.github.com/repos/khanhhua/wordgame-data/contents/menschen/${file}`;
  try {
    const words = await content(url, (decoded) => {
      return decoded
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const parts = line.split(';');
          return {
            id: parts[0],
            word: parts[0],
            meaning: parts[1],
            tags: parts[2],
          };
        })
        .filter((term) => {
          switch (flag) {
            default:
              return true;
            case 'noun': {
              const { tags } = term;
              return (
                tags.includes('MAS') ||
                tags.includes('FEM') ||
                tags.includes('NEU')
              );
            }
          }
        });
    });
    console.log({ words });
    return words;
  } catch (e) {
    return [];
  }
};
