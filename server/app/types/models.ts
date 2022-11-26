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

export type Adopter = User & {
  first_name: string,
  last_name: string,
  age: number,
  house_type: HouseTypes,
  has_pets: boolean,
  has_children: boolean,
  time_at_home: number,
};

export type Shelter = User & {
  name: string
};