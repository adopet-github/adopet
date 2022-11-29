import { HouseTypes } from "../enums"

export type Image = {
  id: string;
  caption: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  generalId: number
}

export type General = {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  images: Image[]
}

export type Location = {
  id: string;
  longitude: number;
  latitude: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number
}

export type User = {
  id: string;
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
  id: string;
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
  id: string;
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
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
  animals: Animal[];
}

export type Shelter = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export type Adopter = {
  id: string;
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
  id: string;
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