import { AdopterBody, ShelterBody, UpdateUserSafeBody } from "../types/bodies";
import { removeUndefinedKeysFromObject } from "./objects";

export const adopterSanitize = {
  sanitizeCreate: (unsafeBody: AdopterBody): AdopterBody => {
    const { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home, latitude, longitude, address } = unsafeBody;

    return { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home, latitude, longitude, address }
  },
  sanitizeUpdate: (unsafeBody: AdopterBody) => {
    const { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home, latitude, longitude, address } = unsafeBody;

    return (removeUndefinedKeysFromObject({ description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home, latitude, longitude, address })) as UpdateUserSafeBody;
  }
};

export const shelterSanitize = {
  sanitizeCreate: (unsafeBody: ShelterBody): ShelterBody => {
    const { description, email, password, phone_number, name, latitude, longitude, address } = unsafeBody;
    return { description, email, password, phone_number, name, latitude, longitude, address };
  },
  sanitizeUpdate: (unsafeBody: ShelterBody) => {
    const { description, email, password, phone_number, name, latitude, longitude, address } = unsafeBody;
    return (removeUndefinedKeysFromObject({ description, email, password, phone_number, name, latitude, longitude, address })) as UpdateUserSafeBody;
  }
}