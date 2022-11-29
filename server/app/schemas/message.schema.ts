import Joi from "@hapi/joi";
import { Author } from "../enums";

const schema = {
  create: Joi.object({
    content: Joi.string().required(),
    author: Joi.string().valid(Author.ADOPTER, Author.SHELTER)
  })
}

export default schema;