import type { ShelterAnimal } from '../types/shelterAnimal';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/animal`;

export const createAnimal = async (animal: ShelterAnimal) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt')
    },
    body: JSON.stringify(animal)
  });

  return await res.json();
};

export const deleteAnimal = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    });
    return await res.json();
  } catch (error) {
    console.log('ERROR: delete animal: ', error);
  }
};

export const addAnimalImage = async (images, id: string) => {
  try {
    const token = localStorage.getItem('jwt');
    const res = await fetch(baseUrl + '/' + id + '/images', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ images: images })
    });

    return await res.json();
  } catch (error) {
    console.log('Error animal image:', error);
  }
};

export const getAllAnimals = async () => {
  const token = localStorage.getItem('jwt');

  const res = await fetch(`${baseUrl}?distance=50`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
};

export const updateAnimal = async (animal: ShelterAnimal) => {
  const { id } = animal;
  delete animal.id;
  delete animal.shelterName;
  delete animal.shelterId;
  delete animal.images;
  delete animal.adopters;
  delete animal.shelterDescription;
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(animal)
  });
  return await res.json();
};

export const acceptLike = async (animalId: string, adopterId: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/${animalId}/match/${adopterId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });

  return await res.json();
};

export const rejectLike = async (animalId: string, adopterId: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/${animalId}/dislike/${adopterId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });

  return await res.json();
};
