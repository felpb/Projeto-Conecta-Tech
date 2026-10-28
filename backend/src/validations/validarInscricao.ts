import type { NovaInscricao } from '../models/inscricao.model';
import { AppError } from '../errors/AppError';

export function validarInscricao(body: unknown): NovaInscricao {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new AppError('Envie uma inscrição em formato JSON.');
  }

  const dados = body as Record<string, unknown>;
  const nome = typeof dados.nome === 'string' ? dados.nome.trim() : '';
  const email = typeof dados.email === 'string' ? dados.email.trim() : '';
  const tipoIngresso = dados.tipoIngresso;

  if (!nome || !email || !tipoIngresso) {
    throw new AppError('Nome, e-mail e tipo de ingresso são obrigatórios.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError('Informe um e-mail válido.');
  }

  if (tipoIngresso !== 'estudante' && tipoIngresso !== 'profissional') {
    throw new AppError('O tipo de ingresso deve ser estudante ou profissional.');
  }

  if (dados.telefone !== undefined && dados.telefone !== null && typeof dados.telefone !== 'string') {
    throw new AppError('O telefone deve ser um texto.');
  }

  let telefone: string | null = null;
  if (typeof dados.telefone === 'string' && dados.telefone.trim() !== '') {
    telefone = dados.telefone.trim();
  }

  return { nome, email, telefone, tipoIngresso };
}
