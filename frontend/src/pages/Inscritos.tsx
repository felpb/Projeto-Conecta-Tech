import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { excluirInscricao, listarInscricoes } from '../services/api';
import type { Inscricao } from '../types';

export default function Inscritos() {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [excluindo, setExcluindo] = useState<number | null>(null);
  const [atualizacao, setAtualizacao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarInscricoes() {
      setCarregando(true);
      setErro('');

      try {
        const dados = await listarInscricoes();
        if (ativo) setInscricoes(dados);
      } catch (error) {
        if (ativo) {
          setErro(error instanceof Error ? error.message : 'Erro ao carregar inscritos.');
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarInscricoes();

    // Evita atualizar a tela se o usuário sair antes da resposta.
    return () => { ativo = false; };
  }, [atualizacao]);

  async function excluir(inscricao: Inscricao) {
    if (excluindo !== null) return;

    const confirmou = window.confirm('Excluir a inscrição de ' + inscricao.nome + '?');
    if (!confirmou) return;

    setExcluindo(inscricao.id);
    setErro('');
    setMensagem('');

    try {
      await excluirInscricao(inscricao.id);
      setInscricoes(atuais => atuais.filter(item => item.id !== inscricao.id));
      setMensagem('Inscrição excluída.');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao excluir inscrição.');
    } finally {
      setExcluindo(null);
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-blue-800">Inscritos no evento</h1>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link to="/inscricao" className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
          Nova inscrição
        </Link>
        <button
          type="button"
          disabled={carregando || excluindo !== null}
          onClick={() => setAtualizacao(atualizacao + 1)}
          className="rounded border border-gray-400 bg-white px-4 py-2 disabled:opacity-50"
        >
          Atualizar lista
        </button>
      </div>

      {mensagem && <p role="status" className="mb-4 rounded bg-green-100 p-3 text-green-800">{mensagem}</p>}
      {erro && <p role="alert" className="mb-4 rounded bg-red-100 p-3 text-red-800">{erro} Use “Atualizar lista” para tentar novamente.</p>}
      {carregando && <p role="status">Carregando inscrições...</p>}

      {!carregando && !erro && inscricoes.length === 0 && (
        <p>Ainda não há inscritos no evento.</p>
      )}

      {!carregando && inscricoes.length > 0 && (
        <>
          <p className="mb-3 inline-block rounded bg-blue-100 px-3 py-1 text-blue-800">
            Total de inscritos: {inscricoes.length}
          </p>
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full border-collapse bg-white text-left text-sm">
              <caption className="sr-only">Participantes do Conecta Tech 2026</caption>
              <thead className="bg-blue-100">
                <tr>
                  <th scope="col" className="border border-gray-300 p-3">Nome</th>
                  <th scope="col" className="border border-gray-300 p-3">E-mail</th>
                  <th scope="col" className="border border-gray-300 p-3">Telefone</th>
                  <th scope="col" className="border border-gray-300 p-3">Ingresso</th>
                  <th scope="col" className="border border-gray-300 p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map(inscricao => (
                  <tr key={inscricao.id} className="even:bg-gray-50 hover:bg-blue-50">
                    <td className="border border-gray-300 p-3">{inscricao.nome}</td>
                    <td className="border border-gray-300 p-3">{inscricao.email}</td>
                    <td className="border border-gray-300 p-3">{inscricao.telefone || 'Não informado'}</td>
                    <td className="border border-gray-300 p-3">{inscricao.tipoIngresso}</td>
                    <td className="border border-gray-300 p-3">
                      <button
                        type="button"
                        onClick={() => excluir(inscricao)}
                        disabled={excluindo !== null}
                        aria-label={'Excluir inscrição de ' + inscricao.nome}
                        className="rounded bg-red-700 px-3 py-1 text-white hover:bg-red-800 disabled:opacity-50"
                      >
                        {excluindo === inscricao.id ? 'Excluindo...' : 'Excluir'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
