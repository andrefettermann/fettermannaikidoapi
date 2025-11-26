// /src/routes/taxas.router.ts
import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import * as controller from '../controllers/taxa.controller';

const router = Router();

router.get('/busca/:id', authenticate, controller.busca);

router.get('/lista/todos', authenticate, controller.buscaTodos);

router.post('/inclui', authenticate, controller.inclui);

router.patch('/altera/:id', authenticate, controller.atualiza);

export default router;