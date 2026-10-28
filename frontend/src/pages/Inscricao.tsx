import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import { criarInscricao } from '../services/api';
import type { TipoIngresso } from '../types';

export default function Inscricao() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoIngresso, setTipoIngresso] = useState<TipoIngresso>('estudante');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function enviar(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    setErro('');
    setMensagem('');

    if (!nome.trim() || !email.trim()) {
      setErro('Preencha seu nome e e-mail.');
      return;
    }

    setEnviando(true);

    try {
      await criarInscricao({ nome, email, telefone, tipoIngresso });
      setMensagem('Inscrição realizada com sucesso!');
      setNome('');
      setEmail('');
      setTelefone('');
      setTipoIngresso('estudante');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao fazer a inscrição.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg border-t-4 border-blue-600 bg-white p-6 shadow-sm">
      <p className="mb-2 text-sm text-blue-700">Conecta Tech · 21 de novembro</p>
      <h1 className="mb-2 text-2xl font-bold">Inscrição no evento</h1>
      <p className="mb-6 text-gray-600">Preencha os dados abaixo. Apenas o telefone é opcional.</p>

      {mensagem && (
        <div role="status" className="mb-4 rounded bg-green-100 p-3 text-green-800">
          <p>{mensagem}</p>
          <Link to="/inscritos" className="underline">Ver lista de inscritos</Link>
        </div>
      )}

      {erro && <p role="alert" className="mb-4 rounded bg-red-100 p-3 text-red-800">{erro}</p>}

      <form onSubmit={enviar}>
        <fieldset disabled={enviando} className="space-y-4">
          <div>
            <label htmlFor="nome" className="mb-1 block">Nome completo</label>
            <input
              id="nome"
              name="nome"
              autoComplete="name"
              value={nome}
              onChange={event => setNome(event.target.value)}
              required
              className="w-full rounded border border-gray-400 p-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              className="w-full rounded border border-gray-400 p-2"
            />
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1 block">Telefone (opcional)</label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              value={telefone}
              onChange={event => setTelefone(event.target.value)}
              className="w-full rounded border border-gray-400 p-2"
            />
          </div>

          <div>
            <label htmlFor="tipoIngresso" className="mb-1 block">Tipo de ingresso</label>
            <select
              id="tipoIngresso"
              name="tipoIngresso"
              value={tipoIngresso}
              onChange={event => setTipoIngresso(event.target.value as TipoIngresso)}
              required
              className="w-full rounded border border-gray-400 p-2"
            >
              <option value="estudante">Estudante</option>
              <option value="profissional">Profissional</option>
            </select>
          </div>
        </fieldset>

        <button type="submit" disabled={enviando} className="mt-6 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-50">
          {enviando ? 'Salvando...' : 'Enviar inscrição'}
        </button>
      </form>
    </div>
  );
}
