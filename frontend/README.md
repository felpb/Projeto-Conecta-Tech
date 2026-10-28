## Organização

- src/pages/Home.tsx: informações do evento.
- src/pages/Inscricao.tsx: formulário de cadastro.
- src/pages/Inscritos.tsx: listagem e exclusão.
- src/services/api.ts: chamadas para a API.
- src/types.ts: tipos dos dados.
- src/App.tsx: menu, rodapé e rotas.
- src/styles.css: importa o Tailwind e define os estilos básicos.

As telas usam classes comuns do Tailwind diretamente no JSX.
O formulário envia os dados para a API; o backend salva as inscrições no SQLite.