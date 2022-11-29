import Joi from "@hapi/joi";

const schema = {
  login: Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).required()
  })
}

export default schema;