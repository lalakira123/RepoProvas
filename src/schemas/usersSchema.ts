import Joi from 'joi';

export const usersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});