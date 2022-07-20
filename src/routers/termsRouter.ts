import { Router } from 'express';

import validateToken from './../middlewares/validateTokenMiddleware.js';

import { list } from './../controllers/termsController.js';

const termsRouter = Router();

termsRouter.use(validateToken);

termsRouter.get('/terms', list);

export default termsRouter;