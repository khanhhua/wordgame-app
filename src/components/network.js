import { default as _debounce } from "lodash.debounce";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const prefix = "wg"; // wordgame

/**
 *
 * @param url
 * @param method
 * @param body
 * @returns {Promise<Response|{ ok: boolean }>}
 */
const request = async (url, method, body = null) => {
  const token = localStorage.getItem(`${prefix}:token`);
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    // headers['Authorization'] = `Bearer ${token}`;
  }
  // Normalize reponse to { ok, error }
  return fetch(
    url,
    method === "GET" || method === "DELETE"
      ? { headers, method }
      : {
          headers,
          method,
          body,
        }
  ).catch((error) => {
    return {
      ok: false,
      error,
    };
  });
};

const handleResponse = async (res) => {
  if (!res) {
    return { ok: false };
  }

  try {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.match(/json/)) {
      if (res.status >= 400) {
        return {
          ok: false,
          error: await res.json(),
        };
      }

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

const api = {
  request,
  async get(uri) {
    const res = await request(`${BASE_URL}${uri}`, "GET");
    return handleResponse(res);
  },
  async post(uri, payload) {
    const res = await request(
      `${BASE_URL}${uri}`,
      "POST",
      JSON.stringify(payload)
    );
    return handleResponse(res);
  },
  async put(uri, payload) {
    const res = await request(
      `${BASE_URL}${uri}`,
      "PUT",
      JSON.stringify(payload)
    );
    return handleResponse(res);
  },
  async patch(uri, payload) {
    const res = await request(
      `${BASE_URL}${uri}`,
      "PATCH",
      JSON.stringify(payload)
    );
    return handleResponse(res);
  },
  async delete(uri) {
    const res = await request(`${BASE_URL}${uri}`, "DELETE");
    return handleResponse(res);
  },
};

export const debounce = (s) => {
  const proxy = {};
  Object.keys(api).forEach((key) => {
    Object.defineProperty(proxy, key, {
      value: _debounce(api[key], s * 1000),
    });
  });

  return proxy;
};

export default api;
