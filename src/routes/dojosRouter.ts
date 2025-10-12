// dojosRoute.ts
import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/dojoController';

const router = Router();

// Esquema de validação para o corpo da requisição
const profileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

/* Dojos routes */
router.get('/busca/:id', authenticate, controller.busca);

router.get('/lista/todos', authenticate, controller.buscaTodos);

router.post('/inclui', authenticate, controller.inclui);

router.patch('/altera/:id', authenticate, controller.atualiza);

export default router;