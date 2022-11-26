import { HouseTypes } from "../enums";

export type OptionalUser = {
  [key: string]: unknown,
  email?: string,
  password?: string,
  phone_number?: string,
  adopter?: OptionalAdopter
};

export type OptionalAdopter = {
  [key: string]: unknown,
  first_name?: string,
  last_name?: string,
  age?: number,
  house_type?: HouseTypes,
  has_pets?: boolean,
  has_children?: boolean,
  time_at_home?: number,
}