import Joi from "@hapi/joi";

const schema = {
  validateId: Joi.object({
    id: Joi.string().uuid({version: 'uuidv4'}).required()
  }),
  validateImages: Joi.object({
    images: Joi.array().items(Joi.object().keys({
      caption: Joi.string().required(),
      url: Joi.string().required()
    }).optional()).min(1).required()
  }),
  validateLike: Joi.object({
    adopterId: Joi.string().uuid({version: 'uuidv4'}).required(),
    animalId: Joi.string().uuid({version: 'uuidv4'}).required()
  })
}

export default schema;