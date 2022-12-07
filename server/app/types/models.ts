import { HouseTypes } from '../enums';

export type General = {
  description?: string;
};

export type Location = {
  longitude: number;
  latitude: number;
  address: string;
};

export type User = General & {
  email: string;
  password?: string;
  salt?: string;
};

export type Adopter = User &
  Location & {
    first_name: string;
    last_name: string;
    age: number;
    house_type: HouseTypes;
    has_pets: boolean;
    has_children: boolean;
    time_at_home: number;
    google_id?: string;
    id?: string;
    images?: Image[];
    like_date?: string;
  };

export type Animal = General & {
  name: string;
  age: number;
  weight: number;
  shelterId?: string;
  images?: Image[];
  adopters?: Adopter[];
  id?: string;
  shelterName?: string;
  shelterDescription?: string;
  distance?: number;
};

export type Shelter = User &
  Location & {
    name: string;
    id?: string;
    images?: Image[];
    animals?: Animal[];
  };

export type Image = {
  caption: string;
  url: string;
};
