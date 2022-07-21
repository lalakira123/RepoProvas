import { Router } from 'express';

import { testsSchema } from './../schemas/testsSchema.js';

import validateToken from './../middlewares/validateTokenMiddleware.js';
import validateSchema from './../middlewares/validateSchemaMiddleware.js';

import { create, listByDiscipline } from './../controllers/testsController.js';

const testsRouter = Router();

testsRouter.use(validateToken);

testsRouter.post('/test', validateSchema(testsSchema), create);
testsRouter.get('/test/discipline', listByDiscipline);

export default testsRouter;