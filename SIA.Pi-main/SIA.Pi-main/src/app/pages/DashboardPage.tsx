import { useEffect, useState } from "react";
import imgKey from "figma:asset/cd26225408f9e79f5b7eb1bfd3cd21f715d6fa33.png";
import imgKey1 from "figma:asset/82a4146fae8dfb2e6b7c181095f257c2a0f3f685.png";
import imgLandlord from "figma:asset/b959b521da184d0c7440c394efd6a1ad9b284bc7.png";
import imgRemoveKey from "figma:asset/85c267c7f68fe91a12fb91175738080249df21e6.png";

const statusColors: Record<string, string> = {
  "em_uso": "bg-[#ffc34c]",
  "pendente": "bg-[#cd2b2e]",
  "disponivel": "bg-[#36bd0c]",
};

function StatCard({ count, label, color, icon }: { count: number; label: string; color: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-6 flex items-center gap-5 flex-1">
      <div className={`${color} rounded-2xl w-24 h-24 flex items-center justify-center flex-shrink-0`}>
        <img src={icon} alt="" className="w-16 h-16 object-contain" />
      </div>
      <div>
        <p className="text-[#001c42] text-4xl font-semibold leading-tight">{count}</p>
        <p className="text-[rgba(0,28,66,0.5)] text-lg font-semibold">{label}</p>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [activities, setActivities] = useState<any[]>([]);

  const fetchMovimentacoes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/movimentacoes/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((m: any) => ({
          id: m.id,
          chave: m.codigo_chave || "N/A",
          descricao: m.observacao || "Sem descrição",
          retiradaPor: m.nome_usuario || "Desconhecido",
          status: m.status || "pendente",
          dataRetirada: m.data_hora ? new Date(m.data_hora).toLocaleString() : "---",
          previsaoDevolucao: m.previsao_devolucao ? new Date(m.previsao_devolucao).toLocaleString() : "---"
        }));
        setActivities(mapped);
      }
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = () => {
      fetchMovimentacoes();
    };
    return () => ws.close();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-[#001c42] text-4xl font-bold">Dashboard de Chaves</h1>
        <p className="text-[#636363] text-lg mt-1">Visão geral do sistema de gerenciamento de chaves</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard count={100} label="Chaves Disponíveis" color="bg-[#36bd0c]" icon={imgKey} />
        <StatCard count={activities.length} label="Movimentações Ativas" color="bg-[#ffc34c]" icon={imgLandlord} />
        <StatCard count={0} label="Alertas" color="bg-[#cd2b2e]" icon={imgRemoveKey} />
      </div>

      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto">
        <div className="grid grid-cols-[80px_180px_1fr_200px_160px_200px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">Chave</span>
          <span className="text-[#636363] text-base font-medium">Descrição</span>
          <span className="text-[#636363] text-base font-medium">Retirada por</span>
          <span className="text-[#636363] text-base font-medium">Status</span>
          <span className="text-[#636363] text-base font-medium">Data Retirada</span>
          <span className="text-[#636363] text-base font-medium">Previsão Devolução</span>
        </div>

        {activities.map((item) => (
          <div key={item.id} className="grid grid-cols-[80px_180px_1fr_200px_160px_200px] gap-4 px-6 py-4 border-b border-[#dfdfdf] items-center">
            <div className="flex items-center gap-2">
              <img src={imgKey1} className="w-5 h-5 object-contain" />
              <span className="text-sm font-semibold text-black">{item.chave}</span>
            </div>
            <span className="text-sm font-semibold text-black">{item.descricao}</span>
            <span className="text-sm font-semibold text-black">{item.retiradaPor}</span>
            <div>
              <span className={`${statusColors[item.status] || 'bg-gray-400'} text-white text-sm font-semibold px-4 py-1.5 rounded-2xl inline-block`}>
                {item.status}
              </span>
            </div>
            <span className="text-sm font-semibold text-black">{item.dataRetirada}</span>
            <span className="text-sm font-semibold text-black">{item.previsaoDevolucao}</span>
          </div>
        ))}
      </div>
    </div>
  );
}