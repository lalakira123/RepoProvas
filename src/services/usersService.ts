import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { conflict, notFound, unauthorized } from './../middlewares/errorHandlerMiddleware.js';

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

async function signIn(user: CreateDataUser){
  const { email, password } = user;
  
  const userExist = await usersRepository.findByEmail(email);
  if(!userExist) throw notFound();

  const validatePassword = bcrypt.compareSync(password, userExist.password);
  if(!validatePassword) throw unauthorized();
  
  const secretKey = process.env.JWT_TOKEN;
  const twelveHours = 60*60*12;
  const config = { expiresIn: twelveHours };
  return jwt.sign({userId: userExist.id}, secretKey, config);
}

export {
  create,
  signIn
}