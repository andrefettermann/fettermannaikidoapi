import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/pessoaController';

const router = Router();

// Esquema de validação para o corpo da requisição
const profileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

router.get('/pessoas/', authenticate, controller.buscaTodos);

export default router;