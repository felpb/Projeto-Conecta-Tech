import type { Request, Response } from 'express';
import { InscricaoModel } from '../../models/inscricao.model';
import { DeleteInscricaoService } from '../../services/inscricao/DeleteInscricaoService';
import { AppError } from '../../errors/AppError';

export class DeleteInscricaoController {
  private service: DeleteInscricaoService;

  constructor(model: InscricaoModel) {
    this.service = new DeleteInscricaoService(model);
  }

  handle = (req: Request, res: Response) => {
    const valor = req.params.id;
    const id = Number(valor);

    if (typeof valor !== 'string' || !/^[1-9]\d*$/.test(valor) || !Number.isSafeInteger(id)) {
      throw new AppError('ID inválido.');
    }

    this.service.execute(id);
    res.status(204).send();
  };
}
