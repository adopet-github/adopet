import Joi from "joi";

const schema = {
  create: Joi.object({
    description: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).required(),
    name: Joi.string().max(255).required(),
    latitude: Joi.number().min(-91).max(91).required(),
    longitude: Joi.number().min(-181).max(181).required(),
    address: Joi.string().max(255).required()
  }),
  update: Joi.object({
    description: Joi.string().max(255).optional(),
    email: Joi.string().max(255).email().optional(),
    password: Joi.string().max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).optional(),
    name: Joi.string().max(255).optional(),
    latitude: Joi.number().min(-91).max(91).optional(),
    longitude: Joi.number().min(-181).max(181).optional(),
    address: Joi.string().max(255).optional()
  })
}

export default schema;