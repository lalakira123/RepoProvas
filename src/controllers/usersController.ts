import { Request, Response } from 'express';

import { CreateDataUser } from './../services/usersService.js';
import * as usersService from './../services/usersService.js';

export async function signUp(req: Request, res: Response){
  delete req.body.confirmPassword;
  
  const user: CreateDataUser = req.body;

  await usersService.create(user);

  res.status(201).send('Usuário Criado!');
}

export async function signIn(req: Request, res: Response){
  const user: CreateDataUser = req.body;

  const token = await usersService.signIn(user);

  res.status(200).send(token);
}