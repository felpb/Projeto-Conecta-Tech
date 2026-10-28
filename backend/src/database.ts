import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export function createDatabase(path: string): DatabaseSync {
  if (path !== ':memory:') {
    mkdirSync(dirname(path), { recursive: true });
  }

  const database = new DatabaseSync(path);
  database.exec(`
    CREATE TABLE IF NOT EXISTS inscricoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE UNIQUE,
      telefone TEXT,
      tipo_ingresso TEXT NOT NULL CHECK (tipo_ingresso IN ('estudante', 'profissional'))
    );
  `);
  return database;
}
