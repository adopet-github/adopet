import { HouseTypes } from "../enums";
import { OptionalUser } from "./models";

export type AdopterBody = { 
  description: string,
  email: string,
  password: string,
  phone_number: string,
  first_name: string,
  last_name: string,
  age: number,
  house_type: HouseTypes,
  has_pets: boolean,
  has_children: boolean,
  time_at_home: number,
  longitude: number,
  latitude: number,
  address: string
};

export type UpdateUserSafeBody = {
  [key: string]: unknown,
  description: string | undefined,
  email: string | undefined,
  password: string | undefined,
  phone_number: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined,
  age: number | undefined,
  house_type: HouseTypes | undefined,
  has_pets: boolean | undefined,
  has_children: boolean | undefined,
  time_at_home: number | undefined,
  name: string | undefined,
};

export type UpdateAdopterRequestBody = {
  description?: string,
  user?: OptionalUser
};

export type ShelterBody = {
  description: string,
  email: string,
  password: string,
  phone_number: string,
  name: string
};