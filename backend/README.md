## Organização

- src/routes.ts: liga as rotas aos controllers.
- src/controllers: recebe a requisição e envia a resposta.
- src/services: valida os dados e executa as regras de cada operação.
- src/validations: confere os campos do cadastro.
- src/models: faz as consultas SQL.
- src/middlewares: trata os erros.
- src/database.ts: abre o banco e cria a tabela.
- src/server.ts: inicia a API na porta fixa 3000.

O cadastro passa pelo controller, pelo service e pelo model até chegar ao SQLite.
O banco fica em data/inscricoes.sqlite quando o backend é iniciado desta pasta.
