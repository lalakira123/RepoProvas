import Joi from 'joi';

interface User {
  email: string,
  password: string,
  confirmPassword: string
}

export const usersSchema = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});