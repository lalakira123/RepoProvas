import { Request, Response } from 'express';

import * as termsService from './../services/termsService.js';

export async function list(req: Request, res: Response){
  const terms = await termsService.list();

  res.status(200).send(terms);
}

