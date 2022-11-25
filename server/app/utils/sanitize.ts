import { AdopterBody } from "../types/bodies";

export function sanitizeAdopter (unsafeBody: AdopterBody): AdopterBody {
  const { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home} = unsafeBody;

  return { description, email, password, phone_number, first_name, last_name, age, house_type, has_pets, has_children, time_at_home}
}