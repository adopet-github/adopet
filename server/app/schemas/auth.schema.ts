import Joi from 'joi';

const schema = {
  login: Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string()
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/
      )
      .messages({
        'string.pattern.base':
          'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'
      })
      .required()
  }),
  verify: Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string()
      .max(255)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([a-zA-Z\d-!$%^&*()·_+|~=`{}[\]:";'<>?,./]){8,}$/
      )
      .messages({
        'string.pattern.base':
          'Password must have at least eight characters, at least one uppercase letter, one lowercase letter and one number'
      })
      .required(),
    first_name: Joi.string()
      .max(255)
      .regex(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base':
          'First name must only include alphabetic characters'
      })
      .required(),
    last_name: Joi.string()
      .max(255)
      .regex(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base':
          'Last name must only include alphabetic characters'
      })
      .required()
  })
};

export default schema;
