import Joi from 'joi';

const schema = {
  validateId: Joi.object({
    id: Joi.string().max(255).uuid({ version: 'uuidv4' }).required()
  }),
  validateImages: Joi.object({
    images: Joi.array()
      .items(
        Joi.object()
          .keys({
            caption: Joi.string().max(255).required(),
            url: Joi.string().uri().regex(/^(https:\/\/res.cloudinary.com\/dyi6bn4vh\/image\/upload\/)[a-z0-9/.]+$/)
            .messages({
              'string.pattern.base':
                'Url origin not valid'
            })
            .max(255).required()
          })
          .optional()
      )
      .min(1)
      .max(4)
      .required()
  }),
  validateLike: Joi.object({
    adopterId: Joi.string().max(255).uuid({ version: 'uuidv4' }).required(),
    animalId: Joi.string().max(255).uuid({ version: 'uuidv4' }).required()
  })
};

export default schema;
