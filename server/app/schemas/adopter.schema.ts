import Joi from "@hapi/joi";
import { HouseTypes } from "../enums";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).required(),
    first_name: Joi.string().regex(/^[A-Za-z]+$/)
      .messages({'string.pattern.base': 'First name must only include alphabetic characters'}).required(),
    last_name: Joi.string().regex(/^[A-Za-z]+$/)
    .messages({'string.pattern.base': 'Last name must only include alphabetic characters'}).required(),
    age: Joi.number().integer().max(120).min(0),
    house_type: Joi.string().valid(HouseTypes.APARTMENT, HouseTypes.HOUSE, HouseTypes.TOWNHOUSE, HouseTypes.VILLA).required(),
    has_pets: Joi.boolean().required(),
    has_children: Joi.boolean().required(),
    time_at_home: Joi.number().integer().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    address: Joi.string().max(255).required()
  }),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).optional(),
    first_name: Joi.string().regex(/^[A-Za-z]+$/)
      .messages({'string.pattern.base': 'First name must only include alphabetic characters'}).optional(),
    last_name: Joi.string().regex(/^[A-Za-z]+$/)
    .messages({'string.pattern.base': 'Last name must only include alphabetic characters'}).optional(),
    age: Joi.number().integer().max(120).min(0),
    house_type: Joi.string().valid(HouseTypes.APARTMENT, HouseTypes.HOUSE, HouseTypes.TOWNHOUSE, HouseTypes.VILLA).optional(),
    has_pets: Joi.boolean().optional(),
    has_children: Joi.boolean().optional(),
    time_at_home: Joi.number().integer().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    address: Joi.string().max(255).optional()
  })
}

export default schema;