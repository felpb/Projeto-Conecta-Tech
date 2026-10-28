import cors from 'cors';
import express from 'express';
import { InscricaoModel } from './models/inscricao.model';
import { createRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';

export function createApp(model: InscricaoModel) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(createRouter(model));
  app.use(errorHandler);
  return app;
}
