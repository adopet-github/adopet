import type { ShelterAnimal } from '../types/shelterAnimal';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/animal`;

export const createAnimal = async (animal: ShelterAnimal) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('jwt')
    },
    body: JSON.stringify(animal)
  });

  return await res.json();
};

export const deleteAnimal = async (id: string) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('jwt')
    },
  });

  return await res.json();
}
