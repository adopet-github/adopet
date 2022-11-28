import { HouseTypes } from "../enums"

export type Image = {
  id: number;
  caption: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  generalId: number
}

export type General = {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  images: Image[]
}

export type Location = {
  id: number;
  longitude: number;
  latitude: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number
}

export type User = {
  id: number;
  email: string;
  password: string;
  phone_number: string;
  createdAt: Date;
  updatedAt: Date;
  generalId: number;
  general: General;
  location: Location
}

export type AdopterAnimal = {
  is_liked: boolean;
  is_matched: boolean;
  createdAt: Date;
  updatedAt: Date;
  animalId: number;
  adopterId: number
}

export type Animal = {
  id: number;
  name: string;
  age: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  generalId: number;
  shelterId: number;
  adopter_animal?: AdopterAnimal
}

export type AdopterFromDb = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  house_type: HouseTypes;
  has_pets: boolean;
  has_children: boolean;
  time_at_home: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  animals: Animal[]
}

export type ShelterFromDb = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  animals: Animal[];
}

export type Shelter = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export type Adopter = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  house_type: string;
  has_pets: boolean;
  has_children: boolean;
  time_at_home: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  adopter_animal: AdopterAnimal;
}

export type AnimalFromDb = {
  id: number;
  name: string;
  age: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  generalId: number;
  shelterId: number;
  general: General;
  shelter: Shelter;
  adopters: Adopter[];
}