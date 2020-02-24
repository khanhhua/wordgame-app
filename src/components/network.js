const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const prefix = 'wg'; // wordgame

/**
 *
 * @param url
 * @param method
 * @param body
 * @returns {Promise<Response|{ ok: boolean }>}
 */
const request = async (url, method, body=null) => {
  const token = localStorage.getItem(`${prefix}:token`);
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // Normalize reponse to { ok, error }
  return fetch(url, method === 'get' ? { headers, method } : {
    headers,
    method,
    body,
  }).catch((error) => {
    return {
      ok: false,
      error,
    };
  });
};

const handleResponse = async res => {
  if (!res) {
    return { ok: false };
  }

  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.match(/json/)) {
      return res.json();
    } else {
      return {
        ok: false,
        error: await res.text(),
      };
    }
  } catch (error) {
    return { ok: false, error };
  }
};

export default {
  async get(uri) {
    const res = await request(`${BASE_URL}${uri}`, 'GET');
    return handleResponse(res);
  },
  async post(uri, payload) {
    const res = await request(`${BASE_URL}${uri}`, 'POST', JSON.stringify(payload));
    return handleResponse(res);
  },
  async put(uri, payload) {
    const res = await request(`${BASE_URL}${uri}`, 'PUT', JSON.stringify(payload));
    return handleResponse(res);
  },
  async patch(uri, payload) {
    const res = await request(`${BASE_URL}${uri}`, 'PATCH', JSON.stringify(payload));
    return handleResponse(res);
  }
}
