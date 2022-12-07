const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/image`;

export const deleteImage = async (id: string) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch(baseUrl + '/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};
