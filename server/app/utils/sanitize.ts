import { Adopter, Animal, Image, Shelter } from '../types/models';
import { removeUndefinedKeysFromObject } from './objects';

export const adopterSanitize = {
  sanitizeCreate: (unsafeBody: Adopter): Adopter => {
    const {
      description,
      email,
      password,
      first_name,
      last_name,
      age,
      house_type,
      has_pets,
      has_children,
      time_at_home,
      latitude,
      longitude,
      address
    } = unsafeBody;

    return {
      description,
      email,
      password,
      first_name,
      last_name,
      age,
      house_type,
      has_pets,
      has_children,
      time_at_home,
      latitude,
      longitude,
      address
    };
  },
  sanitizeUpdate: (unsafeBody: Adopter) => {
    const {
      description,
      email,
      password,
      first_name,
      last_name,
      age,
      house_type,
      has_pets,
      has_children,
      time_at_home,
      latitude,
      longitude,
      address
    } = unsafeBody;

    return removeUndefinedKeysFromObject({
      description,
      email,
      password,
      first_name,
      last_name,
      age,
      house_type,
      has_pets,
      has_children,
      time_at_home,
      latitude,
      longitude,
      address
    }) as Adopter;
  }
};

export const shelterSanitize = {
  sanitizeCreate: (unsafeBody: Shelter): Shelter => {
    const {
      description,
      email,
      password,
      name,
      latitude,
      longitude,
      address
    } = unsafeBody;
    return {
      description,
      email,
      password,
      name,
      latitude,
      longitude,
      address
    };
  },
  sanitizeUpdate: (unsafeBody: Shelter) => {
    const {
      description,
      email,
      password,
      name,
      latitude,
      longitude,
      address
    } = unsafeBody;
    return removeUndefinedKeysFromObject({
      description,
      email,
      password,
      name,
      latitude,
      longitude,
      address
    }) as Shelter;
  }
};

export const animalSanitize = {
  sanitizeCreate: (unsafeBody: Animal): Animal => {
    const { description, name, age, weight, shelterId } = unsafeBody;
    return { description, name, age, weight, shelterId };
  },
  sanitizeUpdate: (unsafeBody: Animal) => {
    const { description, name, age, weight } = unsafeBody;
    return removeUndefinedKeysFromObject({
      description,
      name,
      age,
      weight
    }) as Animal;
  }
};

export const imageSanitize = {
  sanitizeCreate: (unsafeBody: Image): Image => {
    const { caption, url } = unsafeBody;
    return { caption, url };
  }
};
