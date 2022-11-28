import Joi from "@hapi/joi";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).required(),
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    address: Joi.string().max(255).required()
  }),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).optional(),
    name: Joi.string().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    address: Joi.string().max(255).optional()
  })
}

export default schema;