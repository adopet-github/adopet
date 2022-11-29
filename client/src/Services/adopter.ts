const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/adopter`;

export const createUser = async (user) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return await res.json();
};
