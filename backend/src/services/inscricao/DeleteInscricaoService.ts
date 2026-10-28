import { InscricaoModel } from '../../models/inscricao.model';
import { AppError } from '../../errors/AppError';

export class DeleteInscricaoService {
  constructor(private readonly model: InscricaoModel) {}

  execute(id: number): void {
    if (!this.model.excluir(id)) {
      throw new AppError('Inscrição não encontrada.', 404);
    }
  }
}
