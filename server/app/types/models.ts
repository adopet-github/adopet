import { HouseTypes } from "../enums";

export type General = {
  description: string
};

export type Location = {
  longitude: number,
  latitude: number,
  address: string
};

export type User = General & {
  email: string,
  password: string,
  phone_number: string
};

export type Adopter = User & Location & {
  first_name: string,
  last_name: string,
  age: number,
  house_type: HouseTypes,
  has_pets: boolean,
  has_children: boolean,
  time_at_home: number,
};

export type Animal = General & {
  name: string,
  age: number,
  weight: number,
  shelterId: number
};

export type Shelter = User & Location & {
  name: string
};