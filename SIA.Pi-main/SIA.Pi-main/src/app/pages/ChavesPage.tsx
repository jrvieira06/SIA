import { useEffect, useState } from "react";
// Importando o mesmo ícone de chave para manter o padrão visual
import imgKey1 from "figma:asset/82a4146fae8dfb2e6b7c181095f257c2a0f3f685.png";

const statusColors: Record<string, string> = {
  "em_uso": "bg-[#ffc34c]",
  "pendente": "bg-[#cd2b2e]",
  "disponivel": "bg-[#36bd0c]",
};

export function ChavesPage() {
  const [chaves, setChaves] = useState<any[]>([]);

  useEffect(() => {
    // Puxa a lista de chaves do banco de dados falso (localStorage)
    const chavesMock = localStorage.getItem("mock_chaves");
    if (chavesMock) {
      setChaves(JSON.parse(chavesMock));
    }
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-[#001c42] text-4xl font-bold">Gestão de Chaves</h1>
        <p className="text-[#636363] text-lg mt-1">Lista completa do status atual de todas as chaves</p>
      </div>

      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto mt-8">
        <div className="grid grid-cols-[100px_1fr_200px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">Código</span>
          <span className="text-[#636363] text-base font-medium">Descrição da Sala</span>
          <span className="text-[#636363] text-base font-medium text-center">Status Atual</span>
        </div>

        {chaves.map((chave) => (
          <div key={chave.id} className="grid grid-cols-[100px_1fr_200px] gap-4 px-6 py-4 border-b border-[#dfdfdf] items-center">
            <div className="flex items-center gap-2">
              <img src={imgKey1} className="w-5 h-5 object-contain" />
              <span className="text-sm font-semibold text-black">{chave.codigo}</span>
            </div>
            <span className="text-sm font-semibold text-black">{chave.descricao}</span>
            <div className="flex justify-center">
              <span className={`${statusColors[chave.status] || 'bg-gray-400'} text-white text-sm font-semibold px-4 py-1.5 rounded-2xl inline-block text-center w-32`}>
                {chave.status.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}