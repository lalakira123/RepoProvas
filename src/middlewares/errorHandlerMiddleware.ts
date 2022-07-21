import { Request, Response, NextFunction } from 'express';

const serviceToErrorStatusCode = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409
};

export function conflict(){
  return { type: 'conflict' };
}

export function notFound(){
  return { type: 'notFound' };
}

export function unauthorized(){
  return { type: 'unauthorized' };
}

export default async function handleError(error, req: Request, res: Response, next: NextFunction){
  if(error.type) return res.sendStatus(serviceToErrorStatusCode[error.type]);
  console.log(error);
  res.status(500).send('Houve um problema ao se conectar com o servidor');
} 