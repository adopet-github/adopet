import Joi from "@hapi/joi";
import { Author } from "../enums";

const schema = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({'string.pattern.base': 'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'}).required(),
    type: Joi.string().valid(Author.ADOPTER, Author.SHELTER)
  })
}

export default schema;