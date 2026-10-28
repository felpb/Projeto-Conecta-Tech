import type { Request, Response } from 'express';
import { InscricaoModel } from '../../models/inscricao.model';
import { ListInscricaoService } from '../../services/inscricao/ListInscricaoService';

export class ListInscricaoController {
  private service: ListInscricaoService;

  constructor(model: InscricaoModel) {
    this.service = new ListInscricaoService(model);
  }

  handle = (req: Request, res: Response) => {
    const inscricoes = this.service.execute();
    res.json(inscricoes);
  };
}
