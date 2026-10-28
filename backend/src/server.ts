import { resolve } from 'node:path';
import { createApp } from './app';
import { createDatabase } from './database';
import { InscricaoModel } from './models/inscricao.model';

const databasePath = process.env.SQLITE_PATH ?? resolve(process.cwd(), 'data/inscricoes.sqlite');
const database = createDatabase(databasePath);
const model = new InscricaoModel(database);
const app = createApp(model);
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Backend rodando`);
});
