export function removeUndefinedKeysFromObject(obj: { [key: string]: unknown }) {
  for (const key of Object.keys(obj)) if (!obj[key]) delete obj[key];

  return Object.keys(obj).length === 0 ? undefined : obj;
}
