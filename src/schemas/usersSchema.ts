import Joi from 'joi';

import { CreateDataUser } from './../services/usersService.js';

interface User {
  email: string,
  password: string,
  confirmPassword: string
}

export const createUsersSchema = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const usersSchema = Joi.object<CreateDataUser>({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});