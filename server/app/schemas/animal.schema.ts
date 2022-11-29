import Joi from "@hapi/joi";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
    age: Joi.number().max(200).min(0).integer().required(),
    weight: Joi.number().required(),
    shelterId: Joi.string().max(255).uuid({version: 'uuidv4'}).required()
  }),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    name: Joi.string().max(255).optional(),
    age: Joi.number().max(200).min(0).integer().optional(),
    weight: Joi.number().min(0).optional()
  })
}

export default schema;