import Joi from "joi";
import { HouseTypes } from "../enums";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().max(255).regex(/^[A-Za-z]+$/)
    .messages({'string.pattern.base': 'First name must only include alphabetic characters'}).required(),
    last_name: Joi.string().max(255).regex(/^[A-Za-z]+$/)
    .messages({'string.pattern.base': 'Last name must only include alphabetic characters'}).required(),
    age: Joi.number().integer().max(120).min(0),
    house_type: Joi.string().valid(HouseTypes.APARTMENT, HouseTypes.HOUSE, HouseTypes.TOWNHOUSE, HouseTypes.VILLA).required(),
    has_pets: Joi.boolean().required(),
    has_children: Joi.boolean().required(),
    time_at_home: Joi.number().integer().min(0).max(24).required(),
    latitude: Joi.number().min(-91).max(91).required(),
    longitude: Joi.number().min(-181).max(181).required(),
    address: Joi.string().max(255).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}),
    google_id: Joi.string()
  }).xor('password', 'google_id'),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).optional(),
    first_name: Joi.string().max(255).regex(/^[A-Za-z]+$/)
      .messages({'string.pattern.base': 'First name must only include alphabetic characters'}).optional(),
    last_name: Joi.string().max(255).regex(/^[A-Za-z]+$/)
    .messages({'string.pattern.base': 'Last name must only include alphabetic characters'}).optional(),
    age: Joi.number().integer().max(120).min(0),
    house_type: Joi.string().max(255).valid(HouseTypes.APARTMENT, HouseTypes.HOUSE, HouseTypes.TOWNHOUSE, HouseTypes.VILLA).optional(),
    has_pets: Joi.boolean().optional(),
    has_children: Joi.boolean().optional(),
    time_at_home: Joi.number().integer().min(0).max(24).optional(),
    latitude: Joi.number().min(-91).max(91).optional(),
    longitude: Joi.number().min(-181).max(181).optional(),
    address: Joi.string().max(255).optional()
  })
}

export default schema;