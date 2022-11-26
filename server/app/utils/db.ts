import { UpdateAdopterRequestBody, UpdateAdopterSafeBody } from "../types/bodies";
import { OptionalAdopter, OptionalUser } from "../types/models";

export const cascade = {
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
};

export function generateAdopterUpdateBody (safeBody: UpdateAdopterSafeBody) {
  const res: UpdateAdopterRequestBody = {};

  if (safeBody.description) res.description = safeBody.description;
  
  const user = getUserFromSafeBody(safeBody);
  if (user) res.user = user;

  return res;
}

export function getUserFromSafeBody (safeBody: UpdateAdopterSafeBody) {
  const res: OptionalUser = {};

  for (const key of ['email', 'password', 'phone_number']) if (safeBody[key]) res[key] = safeBody[key];

  const adopter = getAdopterFromSafeBody(safeBody);
  if (adopter) res.adopter = adopter;

  return Object.keys(res).length === 0 ? undefined : res;
}

export function getAdopterFromSafeBody (safeBody: UpdateAdopterSafeBody) {
  const res: OptionalAdopter = {};

  for (const key of ['first_name', 'last_name', 'age', 'house_type', 'has_pets', 'has_children', 'time_at_home'])
    if (safeBody[key]) res[key] = safeBody[key];
  
  return Object.keys(res).length === 0 ? undefined : res;
}