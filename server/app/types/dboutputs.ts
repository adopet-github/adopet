import { HouseTypes } from '../enums';

export type Image = {
  id: string;
  caption: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  generalId: string;
};

export type General = {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
};

export type Location = {
  id: string;
  longitude: number;
  latitude: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  generalId: string;
  general: General;
  location: Location;
};

export type AdopterAnimal = {
  is_liked: boolean;
  is_matched: boolean;
  createdAt: string;
  updatedAt: string;
  animalId: string;
  adopterId: string;
};

export type Animal = {
  id: string;
  name: string;
  age: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  generalId: string;
  shelterId: string;
  adopter_animal?: AdopterAnimal;
  adopters?: Adopter[]
};

export type AdopterFromDb = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  house_type: HouseTypes;
  has_pets: boolean;
  has_children: boolean;
  time_at_home: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  animals: Animal[];
  adopter_animal?: AdopterAnimal
};

export type ShelterFromDb = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  animals: Animal[];
};

export type Shelter = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Adopter = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  house_type: string;
  has_pets: boolean;
  has_children: boolean;
  time_at_home: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  adopter_animal: AdopterAnimal;
  user: User;
};

export type AnimalFromDb = {
  id: string;
  name: string;
  age: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  generalId: string;
  shelterId: string;
  general: General;
  shelter: Shelter;
  adopters: Adopter[];
};

export type MatchFromDb = {
  id: string;
  name: string;
  age: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  generalId: string;
  shelterId: string;
  adopters: Adopter[];
  general: General;
};