import Joi from "joi";
import { AccountTypes } from "../enums";

const schema = {
  create: Joi.object({
    content: Joi.string().max(255).required(),
    author: Joi.string().max(255).valid(AccountTypes.ADOPTER, AccountTypes.SHELTER)
  })
}

export default schema;