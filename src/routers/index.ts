import { Router } from 'express';

import usersRouter from './usersRouter.js';
import testsRouter from './testsRouter.js';
import termsRouter from './termsRouter.js';

const router = Router();

router.use(usersRouter);
router.use(testsRouter);
router.use(termsRouter);

export default router;