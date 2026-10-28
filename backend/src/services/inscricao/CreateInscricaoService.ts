import { InscricaoModel } from '../../models/inscricao.model';
import { validarInscricao } from '../../validations/validarInscricao';
import { AppError } from '../../errors/AppError';

export class CreateInscricaoService {
  constructor(private model: InscricaoModel) {}

  execute(body: unknown) {
    const dados = validarInscricao(body);

    if (this.model.emailExiste(dados.email)) {
      throw new AppError('Este e-mail já está inscrito.');
    }

    return this.model.criar(dados);
  }
}
