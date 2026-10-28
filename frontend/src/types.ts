export type TipoIngresso = 'estudante' | 'profissional';

export interface Inscricao {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  tipoIngresso: TipoIngresso;
}

export interface NovaInscricao {
  nome: string;
  email: string;
  telefone: string;
  tipoIngresso: TipoIngresso;
}
