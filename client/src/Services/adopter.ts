import type { Adopter } from '../types/adopter';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/adopter`;

export const createUser = async (user: Adopter) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return await res.json();
};

export const updateAdopter = async (adopter: Adopter) => {
  const { id } = adopter;
  delete adopter.id;
  console.log('after', adopter);
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(adopter)
  });
  return await res.json();
};
