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

export const addAdopterImage = async (image: any, id: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/' + id + '/images', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ images: [image] })
  });

  return await res.json();
};

export const likeAnimal = async (adopterId: string, animalId: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/${adopterId}/like/${animalId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};

export const dislikeAnimal = async (adopterId: string, animalId: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/${adopterId}/dislike/${animalId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};

export const getAdopterMatches = async (id: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/${id}/matches`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });

  return await res.json();
};
