import { Request, Response, NextFunction } from 'express';

const serviceToErrorStatusCode = {
  conflict: 409
};

export function conflict(){
  return { type: 'conflict' };
}

export default async function handleError(error, req: Request, res: Response, next: NextFunction){
  if(error.type) return res.sendStatus(serviceToErrorStatusCode[error.type]);
  res.status(500).send('Houve um problema ao se conectar com o servidor');
} 