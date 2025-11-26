// src/routes/cobrancasRouter.ts
import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/cobranca.controller';

const router = Router();

// Esquema de validação para o corpo da requisição
const profileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

/* Taxas routes */
router.get('/busca/:id', authenticate, controller.busca);

router.get('/pagamento/busca/:id', authenticate, controller.buscaPorPagamento)

router.get('/lista/todos', authenticate, controller.buscaTodos);

router.get('/lista/pessoa/:id', authenticate, controller.buscaPorPessoa);

router.get('/lista/taxa/:id', authenticate, controller.buscaPorTaxa);

router.post('/inclui', authenticate, controller.inclui);

router.post('/pagamento/inclui', authenticate, controller.incluiPagamento);

router.patch('/altera/:id', authenticate, controller.atualiza);

router.patch('/pagamento/altera', authenticate, controller.atualizaPagamento)

router.delete('/pagamento/exclui/:idCobranca/:idPagamento', authenticate, controller.excluiPagamento);

export default router;