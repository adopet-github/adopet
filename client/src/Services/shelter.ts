import type { CreateShelter, Shelter } from '../types/shelter';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/shelter`;

export const createShelter = async (shelter: CreateShelter) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shelter)
  });

  return await res.json();
};

export const updateShelter = async (shelter: Shelter) => {
  const { id } = shelter;
  delete shelter.id;
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(shelter)
  });

  return await res.json();
};
