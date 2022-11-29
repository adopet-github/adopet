import Joi from "@hapi/joi";
import { AccountTypes } from "../enums";

const schema = {
  create: Joi.object({
    content: Joi.string().required(),
    author: Joi.string().valid(AccountTypes.ADOPTER, AccountTypes.SHELTER)
  })
}

export default schema;