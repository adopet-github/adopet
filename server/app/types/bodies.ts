import { HouseTypes } from "../enums";

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
};