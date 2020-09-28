import { default as deepGet } from 'lodash/get';
import { getDb, TBL_SETTINGS } from './indexeddb';

export const set = async (property, value) => {
  const db = await getDb();
  await db.put(TBL_SETTINGS, {
    key: property,
    value,
  });
};

export const get = async (property, path = null) => {
  const db = await getDb();
  const obj = await db.get(TBL_SETTINGS, property);

  if (typeof obj === 'object' && path) {
    return deepGet(obj, `value.${path}`);
  }

  return obj.value;
};
