import type { Shelter } from '../types/shelter';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/shelter`;

export const createShelter = async (shelter: Shelter) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shelter)
  });

  return await res.json();
};
