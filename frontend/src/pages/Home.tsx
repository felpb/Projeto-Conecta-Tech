import { Link } from 'react-router-dom';

const palestrantes = [
  {
    nome: 'Marina Costa',
    iniciais: 'MC',
    cargo: 'Desenvolvedora frontend',
    tema: 'Interfaces que fazem sentido',
  },
  {
    nome: 'Rafael Lima',
    iniciais: 'RL',
    cargo: 'Engenheiro de software',
    tema: 'Do primeiro código à primeira API',
  },
  {
    nome: 'Camila Santos',
    iniciais: 'CS',
    cargo: 'Especialista em dados',
    tema: 'Inteligência artificial na prática',
  },
];

export default function Home() {
  return (
    <div>
      <section className="rounded-lg border-l-4 border-blue-600 bg-white p-6 shadow-sm">
        <p className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
          Inscrições abertas
        </p>
        <h1 className="mb-4 text-3xl font-bold">Conecta Tech</h1>
        <p className="mb-4">
          Um evento de tecnologia para estudantes e profissionais aprenderem
          sobre programação, carreira e inteligência artificial.
        </p>

        <div className="rounded bg-blue-50 p-4">
          <p><strong>Data:</strong> 21 de novembro de 2026</p>
          <p className="mt-2"><strong>Horário:</strong> das 9h às 18h</p>
          <p className="mt-2"><strong>Local:</strong> Auditório Conecta, Concórdia - SC</p>
        </div>

        <Link to="/inscricao" className="mt-6 inline-block rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">
          Inscreva-se <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-bold text-blue-800">Sobre o evento</h2>
        <p className="leading-relaxed">
          O Conecta Tech é um encontro para quem gosta de tecnologia e quer
          conhecer outras pessoas da área. Teremos palestras com exemplos
          práticos e espaço para tirar dúvidas e trocar experiências.
          Você pode participar mesmo se estiver começando a estudar programação.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-blue-800">Palestrantes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {palestrantes.map(palestrante => (
            <article key={palestrante.nome} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
              <div aria-hidden="true" className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                {palestrante.iniciais}
              </div>
              <h3 className="text-lg font-bold">{palestrante.nome}</h3>
              <p className="mt-1 text-sm text-gray-600">{palestrante.cargo}</p>
              <p className="mt-3">{palestrante.tema}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
