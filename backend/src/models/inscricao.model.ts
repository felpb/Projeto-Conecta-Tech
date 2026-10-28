import type { DatabaseSync } from 'node:sqlite';

export type TipoIngresso = 'estudante' | 'profissional';

export interface NovaInscricao {
  nome: string;
  email: string;
  telefone: string | null;
  tipoIngresso: TipoIngresso;
}

export interface Inscricao extends NovaInscricao {
  id: number;
}

export class InscricaoModel {
  constructor(private database: DatabaseSync) {}

  listar(): Inscricao[] {
    const sql = `
      SELECT id, nome, email, telefone, tipo_ingresso AS "tipoIngresso"
      FROM inscricoes ORDER BY id ASC
    `;

    return this.database.prepare(sql).all() as unknown as Inscricao[];
  }

  emailExiste(email: string): boolean {
    const sql = 'SELECT id FROM inscricoes WHERE email = ?';
    const inscricao = this.database.prepare(sql).get(email);
    return inscricao !== undefined;
  }

  criar(dados: NovaInscricao): Inscricao {
    const sql = `
      INSERT INTO inscricoes (nome, email, telefone, tipo_ingresso)
      VALUES (?, ?, ?, ?)
    `;

    const resultado = this.database.prepare(sql).run(
      dados.nome,
      dados.email,
      dados.telefone,
      dados.tipoIngresso
    );

    return {
      id: Number(resultado.lastInsertRowid),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      tipoIngresso: dados.tipoIngresso
    };
  }

  excluir(id: number): boolean {
    const sql = 'DELETE FROM inscricoes WHERE id = ?';
    const resultado = this.database.prepare(sql).run(id);
    return resultado.changes > 0;
  }
}
