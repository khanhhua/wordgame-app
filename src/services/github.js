import api from '../components/network';

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

const DEFAULT_REPO_URL = 'https://api.github.com/repos/khanhhua/wordgame-data';

export const getRepoContents = async (repoUrl = DEFAULT_REPO_URL) => {
  try {
    const res = await api.request(`${repoUrl}/contents`, 'GET');
    const contents = await res.json();
    return Promise.all(
      contents.map(async ({ _links: { self } }) => {
        const url = self.replace('?ref=master', '');
        const packageContent = await content(
          `${url}/package.json`,
          JSON.parse
        );
        return {
          ...packageContent,
          url,
        };
      })
    );
  } catch (e) {
    return [];
  }
};

export const getCollections = async (repoUrl) => {
  const url = `${repoUrl}/package.json`;
  try {
    const json = await content(url, JSON.parse);
    return json.collections.map((item) => ({
      ...item,
      repoUrl,
    }));
  } catch (e) {
    return [];
  }
};

export const getTermsByCollection = async (repoUrl, file, flag = null) => {
  const url = `${repoUrl}/${file}`;
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
