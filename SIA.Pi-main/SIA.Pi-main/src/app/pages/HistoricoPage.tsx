import { useState } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type TipoAcao = "Retirada" | "Devolução";

const tipoColors: Record<TipoAcao, string> = {
  Retirada: "text-black",
  Devolução: "text-[#2b8d01]",
};

const historico = [
  {
    id: 1,
    dataHora: "03/04/2026 08:00",
    tipo: "Retirada" as TipoAcao,
    descricao: 'Chave "LAB - 01" Retirada',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 2,
    dataHora: "03/04/2026 08:10",
    tipo: "Retirada" as TipoAcao,
    descricao: 'Chave "SALA - 1401" Retirada',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 3,
    dataHora: "03/04/2026 08:26",
    tipo: "Devolução" as TipoAcao,
    descricao: 'Chave "LAB - 21" Devolvida',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 4,
    dataHora: "02/04/2026 08:32",
    tipo: "Devolução" as TipoAcao,
    descricao: 'Chave "LAB - 01" Devolvida',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 5,
    dataHora: "02/04/2026 09:12",
    tipo: "Retirada" as TipoAcao,
    descricao: 'Chave "SALA - 1102" Retirada',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 6,
    dataHora: "01/04/2026 09:19",
    tipo: "Devolução" as TipoAcao,
    descricao: 'Chave "SALA - 1401" Devolvida',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 7,
    dataHora: "01/04/2026 09:37",
    tipo: "Retirada" as TipoAcao,
    descricao: 'Chave "LAB - 16" Retirada',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
  {
    id: 8,
    dataHora: "01/04/2026 09:45",
    tipo: "Retirada" as TipoAcao,
    descricao: 'Chave "SALA - 902" Retirada',
    usuario: "Agatha Moreira",
    dispositivo: "102.123.1.456",
  },
];

export function HistoricoPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateSearch, setDateSearch] = useState("");

  const totalPages = 4;

  const filtered = historico.filter((h) => {
    const buscaTexto =
      h.usuario.toLowerCase().includes(search.toLowerCase()) ||
      h.descricao.toLowerCase().includes(search.toLowerCase());

    const buscaData =
      dateSearch === "" ||
      h.dataHora.toLowerCase().includes(dateSearch.toLowerCase());

    return buscaTexto && buscaData;
  });

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[#001c42] text-4xl font-semibold">
          Histórico
        </h1>

        <p className="text-[#636363] text-lg mt-1">
          Histórico de retirada e devolução de chaves por usuário
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl p-6 mb-6">
        <h2 className="text-[#001c42] text-xl font-semibold mb-4">
          Buscar Histórico
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636363]"
              size={22}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busque por usuário ou descrição"
              className="w-full h-12 pl-10 pr-4 border border-[#dfdfdf] rounded-2xl bg-[#fcfcfc] text-[#636363] text-base focus:outline-none focus:border-[#004aad]"
            />
          </div>

          {/* Data */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              placeholder="Ex: 03/04/2026"
              className="w-full h-12 pl-4 pr-10 border border-[#dfdfdf] rounded-2xl bg-[#fcfcfc] text-[#636363] text-base focus:outline-none focus:border-[#004aad]"
            />

            <Calendar
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636363]"
              size={22}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto">
        {/* Header */}
        <div className="min-w-[900px] grid grid-cols-[180px_120px_1fr_200px_180px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">
            Data/Hora
          </span>

          <span className="text-[#636363] text-base font-medium">
            Tipo
          </span>

          <span className="text-[#636363] text-base font-medium">
            Descrição
          </span>

          <span className="text-[#636363] text-base font-medium">
            Usuário
          </span>

          <span className="text-[#636363] text-base font-medium">
            Dispositivo
          </span>
        </div>

        {/* Rows */}
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="min-w-[900px] grid grid-cols-[180px_120px_1fr_200px_180px] gap-4 px-6 py-4 border-b border-[#dfdfdf] last:border-0 items-center"
            >
              <span className="text-sm font-semibold text-black">
                {item.dataHora}
              </span>

              <span
                className={`text-sm font-semibold ${tipoColors[item.tipo]}`}
              >
                {item.tipo}
              </span>

              <span className="text-sm font-semibold text-black">
                {item.descricao}
              </span>

              <span className="text-sm font-semibold text-black">
                {item.usuario}
              </span>

              <span className="text-sm font-semibold text-black">
                {item.dispositivo}
              </span>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-[#636363]">
            Nenhum histórico encontrado.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        <span className="text-[#848484] text-xs font-semibold">
          Exibindo {filtered.length} históricos
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            className="text-[#636363] hover:text-black transition-colors"
          >
            <ChevronLeft size={22} />
          </button>

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded flex items-center justify-center text-sm font-semibold transition-colors ${
                currentPage === page
                  ? "bg-[#004aad] text-white"
                  : "text-[#636363] hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            className="text-[#636363] hover:text-black transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}