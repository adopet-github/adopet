import { Cloudinary } from '@cloudinary/url-gen';

const cloud = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CD_API_KEY,
    apiSecret: import.meta.env.VITE_CD_API_SECRET
  }
});

export const cloudinaryUpload = async (file: string | Blob) => {
  const url = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUD_NAME
  }/image/upload`;

  const formData = new FormData();
  formData.append('upload_preset', 'adopet_preset');
  formData.append('file', file);

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });

  return await res.json();
};
