import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Inscricao from './pages/Inscricao';
import Inscritos from './pages/Inscritos';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-800">
      <a href="#conteudo" className="sr-only focus:not-sr-only">
        Pular para o conteúdo
      </a>

      <header className="bg-blue-700 p-4 text-white shadow">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-2xl font-bold">
            <span aria-hidden="true" className="mr-2 text-blue-200">&lt;/&gt;</span>
            Conecta Tech
          </Link>

          <nav aria-label="Menu principal" className="mt-3 flex flex-wrap gap-5">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'underline' : ''}>
              Início
            </NavLink>
            <NavLink to="/inscricao" className={({ isActive }) => isActive ? 'underline' : ''}>
              Inscreva-se
            </NavLink>
            <NavLink to="/inscritos" className={({ isActive }) => isActive ? 'underline' : ''}>
              Inscritos
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/inscritos" element={<Inscritos />} />
          <Route path="*" element={
            <div>
              <h1 className="mb-4 text-2xl font-bold">Página não encontrada</h1>
              <Link to="/" className="text-blue-700 underline">Voltar ao início</Link>
            </div>
          } />
        </Routes>
      </main>

      <footer className="mt-8 border-t border-gray-300 bg-gray-200 p-4 text-center text-sm">
        Conecta Tech.
      </footer>
    </div>
  );
}
