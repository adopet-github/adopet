import Joi from "@hapi/joi";

const schema = {
  validateId: Joi.object({
    id: Joi.string().max(255).uuid({version: 'uuidv4'}).required()
  }),
  validateImages: Joi.object({
    images: Joi.array().items(Joi.object().keys({
      caption: Joi.string().max(255).required(),
      url: Joi.string().max(255).required()
    }).optional()).min(1).max(4).required()
  }),
  validateLike: Joi.object({
    adopterId: Joi.string().max(255).uuid({version: 'uuidv4'}).required(),
    animalId: Joi.string().max(255).uuid({version: 'uuidv4'}).required()
  })
}

export default schema;