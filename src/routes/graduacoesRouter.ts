import { Router} from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/graduacao.controller';

const router = Router();

// Esquema de validação para o corpo da requisição
const profileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

/* Taxas routes */
router.get('/busca/:id', authenticate, controller.busca);

router.get('/lista/todos', authenticate, controller.buscaTodos);

router.post('/inclui', authenticate, controller.inclui);

router.patch('/altera/:id', authenticate, controller.atualiza);

router.delete('/exclui/:id', authenticate, controller.exclui);

export default router;