import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware.js';

import { usersSchema } from './../schemas/usersSchema.js';

import { signUp } from './../controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/signup', validateSchema(usersSchema), signUp);

export default usersRouter;