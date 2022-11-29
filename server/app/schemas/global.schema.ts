import Joi from "@hapi/joi";

const schema = {
  validateId: Joi.object({
    id: Joi.number().integer().required()
  }),
  validateImages: Joi.object({
    images: Joi.array().items(Joi.object().keys({
      caption: Joi.string().required(),
      url: Joi.string().required()
    }).optional()).required()
  }),
  validateLike: Joi.object({
    adopterId: Joi.number().integer().required(),
    animalId: Joi.number().integer().required()
  })
}

export default schema;