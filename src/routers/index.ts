import { Router } from 'express';

import usersRouter from './usersRouter.js';
import testsRouter from './testsRouter.js';

const router = Router();

router.use(usersRouter);
router.use(testsRouter);

export default router;