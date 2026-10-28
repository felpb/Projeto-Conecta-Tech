import type { Inscricao, NovaInscricao } from '../types';

const apiUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function fazerRequisicao(caminho: string, opcoes?: RequestInit) {
  let resposta: Response;
  try {
    resposta = await fetch(apiUrl + caminho, opcoes);
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Confira se o backend está rodando e tente novamente.');
  }

  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => null);
    throw new Error(dados?.erro || 'Não foi possível concluir a solicitação. Tente novamente.');
  }
  return resposta;
}

export async function listarInscricoes(): Promise<Inscricao[]> {
  const resposta = await fazerRequisicao('/inscricoes');
  return resposta.json();
}

export async function criarInscricao(dados: NovaInscricao): Promise<Inscricao> {
  const resposta = await fazerRequisicao('/inscricoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return resposta.json();
}

export async function excluirInscricao(id: number): Promise<void> {
  await fazerRequisicao('/inscricoes/' + id, { method: 'DELETE' });
}
