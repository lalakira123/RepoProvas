import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware.js';

import { usersSchema, createUsersSchema } from './../schemas/usersSchema.js';

import { signIn, signUp } from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(createUsersSchema), signUp);
usersRouter.post('/signin', validateSchema(usersSchema), signIn);

export default usersRouter;