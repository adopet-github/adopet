import type { Message } from '../types/message';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/message/adopter/`;

export const createMessage = async (message: Message) => {
  console.log('in service: ', message)
  const { adopterId, animalId, author, content } = message
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + adopterId + '/animal/' + animalId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({author, content})
  });

  return await res.json();
};

