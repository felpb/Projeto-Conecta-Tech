# Conecta Tech

O frontend usa React, React Router, TypeScript e Tailwind.
O backend usa Node.js, Express, TypeScript e SQLite.

## Antes de começar

Instale o Node.js 24 ou superior. O npm vem junto com ele.

Confira as versões no terminal:

```bash
node -v
npm -v
```

Depois de baixar e extrair o projeto, abra a pasta que contém:

```text
backend/
frontend/
README.md
```

Abra dois terminais nessa pasta: um para o backend e outro para o frontend.
Os comandos abaixo funcionam no PowerShell e no terminal Linux.

## 1. Iniciar o backend

No primeiro terminal:

```bash
cd backend
npm install
npm run dev
```

## 2. Iniciar o frontend

No segundo terminal, começando na pasta principal do projeto:

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## Rotas da API

| Método | Endereço | O que faz |
| --- | --- | --- |
| GET | /inscricoes | Lista as inscrições |
| POST | /inscricoes | Cadastra uma inscrição |
| DELETE | /inscricoes/:id | Exclui uma inscrição pelo ID |

Exemplo de JSON para cadastrar:

```json
{
  "nome": "Maria",
  "email": "maria@example.com",
  "telefone": "11999999999",
  "tipoIngresso": "estudante"
}
```

## Compilar o projeto

Pare os servidores de desenvolvimento antes de executar as versões compiladas.

No terminal do backend, já dentro da pasta `backend`:

```bash
npm run build
npm start
```

No terminal do frontend, já dentro da pasta `frontend`:

```bash
npm run build
npm run preview
```

