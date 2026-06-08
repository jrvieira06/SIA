import { useState } from "react";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import imgKey1 from "figma:asset/82a4146fae8dfb2e6b7c181095f257c2a0f3f685.png";

type KeyStatus = "Disponível" | "Em uso" | "Pendente";

const statusColors: Record<KeyStatus, string> = {
  Disponível: "bg-[#36bd0c]",
  "Em uso": "bg-[#ffc34c]",
  Pendente: "bg-[#cd2b2e]",
};

const keysDataIniciais = [
  { id: 1, codigo: "LAB - 16", categoria: "Laboratório 16", localizacao: "Armário A - Posição 16", status: "Disponível" as KeyStatus },
  { id: 2, codigo: "LAB - 15", categoria: "Laboratório 15", localizacao: "Armário A - Posição 15", status: "Em uso" as KeyStatus },
  { id: 3, codigo: "LAB - 14", categoria: "Laboratório 14", localizacao: "Armário A - Posição 14", status: "Disponível" as KeyStatus },
  { id: 4, codigo: "SALA - 101", categoria: "Sala 101", localizacao: "Armário B - Posição 16", status: "Disponível" as KeyStatus },
  { id: 5, codigo: "SALA - 102", categoria: "Sala 102", localizacao: "Armário B - Posição 01", status: "Em uso" as KeyStatus },
  { id: 6, codigo: "ARM - TI", categoria: "Armário TI", localizacao: "Armário C - Posição 10", status: "Em uso" as KeyStatus },
  { id: 7, codigo: "AUD - 01", categoria: "Auditório Principal", localizacao: "Armário C - Posição 20", status: "Em uso" as KeyStatus },
  { id: 8, codigo: "LAB - 01", categoria: "Laboratório 01", localizacao: "Armário A - Posição 01", status: "Disponível" as KeyStatus },
];

export function ChavesPage() {
  const [search, setSearch] = useState("");
  const [keysData, setKeysData] = useState(keysDataIniciais);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const filtered = keysData.filter(
    (k) =>
      k.codigo.toLowerCase().includes(search.toLowerCase()) ||
      k.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[#001c42] text-4xl font-semibold">Chaves</h1>
        <p className="text-[#636363] text-lg mt-1">Gerencias todas as chaves cadastrados</p>
      </div>

      {/* Search card */}
      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl p-6 mb-6">
        <h2 className="text-[#001c42] text-xl font-semibold mb-4">Buscar Chaves</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636363]" size={22} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busque pela chave pelo número da sala/Lab"
            className="w-full h-12 pl-10 pr-4 border border-[#dfdfdf] rounded-2xl bg-[#fcfcfc] text-[#636363] text-base focus:outline-none focus:border-[#004aad]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto">
        {/* Header row */}
        <div className="grid grid-cols-[160px_200px_1fr_160px_80px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">Código</span>
          <span className="text-[#636363] text-base font-medium">Categoria</span>
          <span className="text-[#636363] text-base font-medium">Localização (Armário)</span>
          <span className="text-[#636363] text-base font-medium">Status</span>
          <span className="text-[#636363] text-base font-medium">Ações</span>
        </div>

        {/* Data rows */}
        {filtered.map((key) => (
          <div
            key={key.id}
            className="grid grid-cols-[160px_200px_1fr_160px_80px] gap-4 px-6 py-4 border-b border-[#dfdfdf] last:border-0 items-center"
          >
            <div className="flex items-center gap-2">
              <img src={imgKey1} alt="" className="w-5 h-5 object-contain" />
              <span className="text-sm font-semibold text-black">{key.codigo}</span>
            </div>
            <span className="text-sm font-semibold text-black">{key.categoria}</span>
            <span className="text-sm font-semibold text-black">{key.localizacao}</span>
            <div>
              <span
                className={`${statusColors[key.status]} text-white text-sm font-semibold px-3 py-1.5 rounded-2xl inline-block`}
              >
                {key.status}
              </span>
            </div>
            <button
              onClick={() => setKeysData((prev) => prev.filter((k) => k.id !== key.id))}
              className="text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-[#848484] text-xs font-semibold">
          Exibindo {filtered.length} de 200 chaves
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="text-[#636363] hover:text-black transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
