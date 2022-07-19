import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { conflict } from './../middlewares/errorHandlerMiddleware.js';

import * as usersRepository from './../repositories/usersRepository.js';

export type CreateDataUser = Omit<User, "id">;

async function create(user: CreateDataUser){
  const { email, password } = user;

  const userExist = await usersRepository.findByEmail(email);
  if(userExist) throw conflict();

  const SALT = 10;
  user = {
    ...user,
    password: bcrypt.hashSync(password, SALT)
  }

  await usersRepository.create(user);
}

export {
  create
}