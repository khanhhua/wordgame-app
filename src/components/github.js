import api  from './network';

export const getCollections = async () => {
  const url = 'https://api.github.com/repos/khanhhua/wordgame-data/contents/menschen/package.json';
  try {
    const res = await api.request(url, 'GET');
    if (!res.ok) {
      throw new Error('Bad Request');
    }

    const data = await res.json();
    if (data.encoding !== 'base64') {
      throw new Error('Bad Request');
    }

    const json = JSON.parse(atob(data.content));
    return json.collections;
  } catch (e) {
    return [];
  }
};
