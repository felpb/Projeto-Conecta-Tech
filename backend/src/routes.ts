import { Router } from 'express';
import { InscricaoModel } from './models/inscricao.model';
import { CreateInscricaoController } from './controllers/inscricao/CreateInscricaoController';
import { ListInscricaoController } from './controllers/inscricao/ListInscricaoController';
import { DeleteInscricaoController } from './controllers/inscricao/DeleteInscricaoController';

export function createRouter(model: InscricaoModel) {
  const router = Router();

  const criarInscricao = new CreateInscricaoController(model);
  const listarInscricoes = new ListInscricaoController(model);
  const excluirInscricao = new DeleteInscricaoController(model);

  router.get('/inscricoes', listarInscricoes.handle);
  router.post('/inscricoes', criarInscricao.handle);
  router.delete('/inscricoes/:id', excluirInscricao.handle);

  return router;
}
