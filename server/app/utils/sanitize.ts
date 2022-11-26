import { AdopterBody, UpdateAdopterSafeBody } from "../types/bodies";
import { removeUndefinedKeysFromObject } from "./objects";

export function sanitizeAdopterCreate (unsafeBody: AdopterBody): AdopterBody {
  const { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home} = unsafeBody;

  return { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home}
};

export function sanitizeAdopterUpdate (unsafeBody: AdopterBody) {
  const { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home} = unsafeBody;

  return (removeUndefinedKeysFromObject({ description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home})) as UpdateAdopterSafeBody;
}