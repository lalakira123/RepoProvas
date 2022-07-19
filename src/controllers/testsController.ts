import { Request, Response } from 'express';

import { BodyDataTest } from './../services/testsService.js';
import * as testsService from './../services/testsService.js';

export async function create(req: Request, res: Response){
  const test: BodyDataTest = req.body;

  await testsService.create(test);

  res.status(201).send('A prova foi criada com sucesso!');
}