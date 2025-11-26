// /src/routes/usuario.router.ts
import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/usuario.controller';

const router = Router();

router.get('/busca/:id', authenticate, controller.busca);

router.post('/', authenticate, controller.login);

export default router;