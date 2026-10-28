import type { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ erro: error.message });
    return;
  }
  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({ erro: 'JSON inválido.' });
    return;
  }
  console.error(error);
  response.status(500).json({ erro: 'Erro interno do servidor.' });
};
