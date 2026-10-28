import type { Request, Response } from 'express';
import { InscricaoModel } from '../../models/inscricao.model';
import { CreateInscricaoService } from '../../services/inscricao/CreateInscricaoService';

export class CreateInscricaoController {
  private service: CreateInscricaoService;

  constructor(model: InscricaoModel) {
    this.service = new CreateInscricaoService(model);
  }

  handle = (req: Request, res: Response) => {
    const inscricao = this.service.execute(req.body);
    res.status(201).json(inscricao);
  };
}
