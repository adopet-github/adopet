import type { Message } from '../types/message';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/message/adopter/`;

export const createMessage = async (message: Message) => {
  const { adopterId, animalId, author, content } = message;
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + adopterId + '/animal/' + animalId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ author, content })
  });

  return await res.json();
};

export const retrieveByMatch = async (idObject: {
  adopterId: string;
  animalId: string;
}) => {
  const { adopterId, animalId } = idObject;
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + adopterId + '/animal/' + animalId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};
