import Joi from "@hapi/joi";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    weight: Joi.number().required(),
    shelterId: Joi.number().integer().required()
  }),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    name: Joi.string().optional(),
    age: Joi.number().integer().optional(),
    weight: Joi.number().optional()
  })
}

export default schema;