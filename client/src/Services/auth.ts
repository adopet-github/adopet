import type { Credentials } from '../types/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

export const logIn = async (credentials: Credentials) => {
  const res = await fetch(baseUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return await res.json();
};

export const logOut = async () => {
  // REFACTOR TO SERVER SIDE HTTP ONLY COOKIE
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({})
  });
  localStorage.removeItem('jwt');
  return await res.json();
};

export const getProfile = async () => {
  // REFACTOR TO SERVER SIDE HTTP ONLY COOKIE
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};
