export type CreateShelter = {
  description: string;
  email: string;
  password: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

export type Shelter = {
  id: string;
  description: string;
  email: string;
  longitude: number;
  latitude: number;
  address: string;
  images: string[];
  name: string;
};
