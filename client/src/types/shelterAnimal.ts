export type ShelterAnimal = {
  images?: { caption: string; url: string; id: string }[];
  shelterId: string;
  shelterName?: string;
  id?: string;
  name: string;
  age: number;
  weight: number;
  description: string;
  adopters?: [];
  shelterDescription?: string;
};
