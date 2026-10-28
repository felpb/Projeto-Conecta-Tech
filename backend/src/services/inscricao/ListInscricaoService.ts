import { InscricaoModel } from '../../models/inscricao.model';

export class ListInscricaoService {
  constructor(private readonly model: InscricaoModel) {}

  execute() {
    return this.model.listar();
  }
}
