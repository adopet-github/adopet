import type { Pet } from '../types/animal';
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

export const addAnimalImage = async (image, id: string) => {
  try {
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
  } catch (error) {
    console.log('Error animal image:', error);
  }
};

export const getAllAnimals = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6ImFkbWluIiwiaWF0IjoxNjY5NjQ1NTk2fQ.yvJclTGWcFt8_RyO8mGzYNR8_gl4eYi6ixWqOQqZikU';

  const res = await fetch(baseUrl, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export const updateAnimal = async (animal: ShelterAnimal) => {
  const { id } = animal;
  delete animal.id;
  delete animal.shelterId;
  delete animal.images;
  delete animal.adopters;
  console.log('animal in service', animal)
  const token = localStorage.getItem('jwt');
  console.log('id in service', id)
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
