import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import Joi from 'joi';
import * as controller from '../controllers/pessoaController';

const router = Router();

// Esquema de validação para o corpo da requisição
const profileSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});


/* Pessoa routes */

router.get('/busca/:id', authenticate, controller.busca);

router.get('/lista/todos', authenticate, controller.buscaTodos);

router.get('/lista/situacao/:situacao', authenticate, controller.buscaSituacao);

router.get('/lista/aniversariantes/:mes', authenticate, controller.buscaAniversariantes);

router.get('/lista/professores', authenticate, controller.buscaProfessores)

router.post('/inclui/', authenticate, controller.inclui);

router.patch('/altera/:id', authenticate, controller.atualiza);

/* Graduacao routes

router.get('/graduacao/:id', graduacaoController.busca);

router.get('/graduacoes/', graduacaoController.buscaTodos);

router.post('/graduacao/',graduacaoController.inclui);

router.patch('/graduacao/:id', graduacaoController.atualiza);

*/

/* Dojo routes 

router.get('/dojo/:id', dojoController.busca);

router.get('/dojos/', dojoController.buscaTodos);

router.post('/dojo/', dojoController.inclui);

router.patch('/dojo/:id', dojoController.atualiza);
*/

export default router;