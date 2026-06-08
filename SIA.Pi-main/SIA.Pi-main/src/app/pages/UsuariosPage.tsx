import { useNavigate } from "react-router";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const usuariosIniciais = [
  { id: 1, nome: "Agatha Moreira de Souza", email: "agatha.moreira@edu.pe.senac.br", matricula: "53456", tipo: "Professor(a)", status: "Ativo" },
  { id: 2, nome: "Mário Sobral de Lima", email: "mario.sobral@edu.pe.senac.br", matricula: "12456", tipo: "Funcionário", status: "Ativo" },
  { id: 3, nome: "Prof. Júlio Ribeiro da Silva", email: "julio.ribeiro@edu.pe.senac.br", matricula: "78901", tipo: "Professor(a)", status: "Ativo" },
  { id: 4, nome: "Prof. Maria Fernanda Oliveira Santos", email: "maria.santos@edu.pe.senac.br", matricula: "34567", tipo: "Professor(a)", status: "Ativo" },
  { id: 5, nome: "Prof. Ana Beatriz Costa Almeida", email: "ana.almeida@edu.pe.senac.br", matricula: "23456", tipo: "Professor(a)", status: "Ativo" },
  { id: 6, nome: "Carlos Eduardo Mendes", email: "carlos.mendes@edu.pe.senac.br", matricula: "67890", tipo: "Funcionário", status: "Inativo" },
];

export function UsuariosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [usuariosLista, setUsuariosLista] = useState(usuariosIniciais);

  const filtered = usuariosLista.filter(
    (u) =>
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.matricula.includes(search)
  );

  return (
    <div className="p-4 md:p-8">

      <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-4">
        <div>
          <h1 className="text-[#001c42] text-4xl font-semibold">
            Usuários
          </h1>

          <p className="text-[#636363] text-lg mt-1">
            Gerencie os usuários do sistema
          </p>
        </div>

        <button
          onClick={() => navigate("/app/usuarios/cadastro")}
          className="flex items-center justify-center gap-2 bg-[#004aad] text-white font-semibold px-5 py-3 rounded-2xl hover:bg-[#003d91] transition-colors"
        >
          <Plus size={18} />
          Novo Usuário
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl p-4 md:p-6 mb-6">
        <h2 className="text-[#001c42] text-xl font-semibold mb-4">
          Buscar Usuários
        </h2>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636363]"
            size={22}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busque os usuários por nome ou matrícula"
            className="w-full h-12 pl-10 pr-4 border border-[#dfdfdf] rounded-2xl bg-[#fcfcfc] text-[#636363] text-base focus:outline-none focus:border-[#004aad]"
          />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white border-2 border-[#dfdfdf] rounded-2xl p-4"
          >
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-black">
                  {user.nome}
                </p>

                <p className="text-sm text-[#636363]">
                  Mat: {user.matricula}
                </p>
              </div>

              <p className="text-sm text-black break-all">
                {user.email}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {user.tipo}
                </span>

                <span
                  className={`text-sm font-semibold ${
                    user.status === "Ativo"
                      ? "text-[#36bd0c]"
                      : "text-[#cd2b2e]"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() =>
                    navigate(`/app/usuarios/editar/${user.id}`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-[#004aad] text-white py-2 rounded-xl"
                >
                  <Pencil size={16} />
                  Editar
                </button>

                <button
  onClick={() =>
    setUsuariosLista((prev) =>
      prev.filter((u) => u.id !== user.id)
    )
  }
  className="text-red-500 hover:text-red-700 transition-colors px-2"
>
  <Trash2 size={18} />
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto">
        <div className="grid grid-cols-[1fr_280px_120px_120px_140px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">Nome</span>
          <span className="text-[#636363] text-base font-medium">E-mail</span>
          <span className="text-[#636363] text-base font-medium">Tipo</span>
          <span className="text-[#636363] text-base font-medium">Status</span>
          <span className="text-[#636363] text-base font-medium">Ações</span>
        </div>

        {filtered.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[1fr_280px_120px_120px_140px] gap-4 px-6 py-4 border-b border-[#dfdfdf] last:border-0 items-center"
          >
            <div>
              <p className="text-sm font-semibold text-black">
                {user.nome}
              </p>

              <p className="text-xs text-[#636363]">
                Mat: {user.matricula}
              </p>
            </div>

            <span className="text-sm font-semibold text-black truncate">
              {user.email}
            </span>

            <span className="text-sm font-semibold text-black">
              {user.tipo}
            </span>

            <span
              className={`text-sm font-semibold ${
                user.status === "Ativo"
                  ? "text-[#36bd0c]"
                  : "text-[#cd2b2e]"
              }`}
            >
              {user.status}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(`/app/usuarios/editar/${user.id}`)
                }
                className="flex items-center gap-2 bg-[#004aad] text-white px-3 py-2 rounded-xl hover:bg-[#003d91]"
              >
                <Pencil size={16} />
                Editar
              </button>

              <button
  onClick={() =>
    setUsuariosLista((prev) =>
      prev.filter((u) => u.id !== user.id)
    )
  }
  className="text-red-500 hover:text-red-700 transition-colors"
>
  <Trash2 size={18} />
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}