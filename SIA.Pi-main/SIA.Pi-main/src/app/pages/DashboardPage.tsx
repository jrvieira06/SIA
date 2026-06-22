import { useEffect, useState } from "react";
import imgKey from "figma:asset/cd26225408f9e79f5b7eb1bfd3cd21f715d6fa33.png";
import imgKey1 from "figma:asset/82a4146fae8dfb2e6b7c181095f257c2a0f3f685.png";
import imgLandlord from "figma:asset/b959b521da184d0c7440c394efd6a1ad9b284bc7.png";
import imgRemoveKey from "figma:asset/85c267c7f68fe91a12fb91175738080249df21e6.png";

// =========================================================================
// ⚙️ ÁREA DE CONFIGURAÇÃO DAS TAGS NFC (Preencha quando seu colega enviar)
// =========================================================================
const TAG_AUTORIZADA = "TAG_CERTA_AQUI"; // Exemplo: "A1B2C3D4"
const TAG_NEGADA = "TAG_ERRADA_AQUI";    // Exemplo: "E5F6G7H8"

// Dados de quem vai retirar a chave quando a Tag Autorizada for lida:
const NOME_PROFESSOR = "Prof. Ricardo";
const CODIGO_CHAVE_VINCULADA = "SALA-101";
// =========================================================================

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

const inicializarBancoFalso = () => {
  if (!localStorage.getItem("mock_chaves")) {
    const chavesMock = [
      { id: 1, codigo: "SALA-101", descricao: "Laboratório de Redes", status: "disponivel" },
      { id: 2, codigo: "AUD-01", descricao: "Auditório Principal", status: "disponivel" },
    ];
    localStorage.setItem("mock_chaves", JSON.stringify(chavesMock));
  }
  if (!localStorage.getItem("mock_movimentacoes")) {
    localStorage.setItem("mock_movimentacoes", JSON.stringify([]));
  }
};

export function DashboardPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [chavesDisponiveis, setChavesDisponiveis] = useState(0);

  const carregarDados = () => {
    inicializarBancoFalso();
    const movs = JSON.parse(localStorage.getItem("mock_movimentacoes") || "[]");
    setActivities(movs);

    const chaves = JSON.parse(localStorage.getItem("mock_chaves") || "[]");
    setChavesDisponiveis(chaves.filter((c: any) => c.status === "disponivel").length);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // ---------------------------------------------------------
  // LÓGICA DE TROCA DE STATUS QUANDO A TAG É LIDA
  // ---------------------------------------------------------
  const processarLeituraNFC = (tagId: string) => {
    // 1. Verifica se é a tag programada para ser NEGADA
    if (tagId === TAG_NEGADA) {
      alert("❌ ACESSO NEGADO: Esta Tag não possui permissão para retirar chaves.");
      return; // Para a execução aqui, não faz mais nada.
    }

    // 2. Verifica se é a tag programada para ser AUTORIZADA
    if (tagId === TAG_AUTORIZADA) {
      let chaves = JSON.parse(localStorage.getItem("mock_chaves") || "[]");
      let movs = JSON.parse(localStorage.getItem("mock_movimentacoes") || "[]");
      
      const chaveAtual = chaves.find((c: any) => c.codigo === CODIGO_CHAVE_VINCULADA);

      if (chaveAtual.status === "disponivel") {
        // Ação: RETIRAR A CHAVE
        chaveAtual.status = "em_uso";
        movs.push({
          id: "nfc_" + Date.now(),
          chave: CODIGO_CHAVE_VINCULADA,
          descricao: chaveAtual.descricao,
          retiradaPor: NOME_PROFESSOR,
          status: "em_uso",
          dataRetirada: new Date().toLocaleString(),
          previsaoDevolucao: "---"
        });
        alert(`✅ ACESSO LIBERADO: Chave ${CODIGO_CHAVE_VINCULADA} retirada por ${NOME_PROFESSOR}`);
      } else {
        // Ação: DEVOLVER A CHAVE
        chaveAtual.status = "disponivel";
        movs = movs.filter((m: any) => m.chave !== CODIGO_CHAVE_VINCULADA);
        alert(`🔄 DEVOLUÇÃO CONFIRMADA: Chave ${CODIGO_CHAVE_VINCULADA} devolvida por ${NOME_PROFESSOR}`);
      }

      localStorage.setItem("mock_chaves", JSON.stringify(chaves));
      localStorage.setItem("mock_movimentacoes", JSON.stringify(movs));
      carregarDados(); // Atualiza a tela na mesma hora
    } else {
      // 3. Se for uma tag completamente desconhecida
      alert(`⚠️ Tag não reconhecida pelo sistema: ${tagId}`);
    }
  };

  // ---------------------------------------------------------
  // CONEXÃO DIRETA COM O ESP32 VIA CABO USB
  // ---------------------------------------------------------
  const conectarESP32 = async () => {
    try {
      const navSerial = (navigator as any).serial;
      if (!navSerial) {
        alert("Seu navegador não suporta conexão USB. Use o Google Chrome ou Edge no PC.");
        return;
      }

      const port = await navSerial.requestPort();
      await port.open({ baudRate: 9600 });
      alert("Leitor NFC Conectado com sucesso! Pode encostar a Tag.");

      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();

      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) { reader.releaseLock(); break; }
        if (value) {
          buffer += value;
          if (buffer.includes("\n")) {
            const linha = buffer.trim();
            if (linha.startsWith("TAG:")) {
              const tag = linha.split(":")[1];
              processarLeituraNFC(tag);
            }
            buffer = ""; 
          }
        }
      }
    } catch (error) {
      console.error("Erro no Leitor NFC:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[#001c42] text-4xl font-bold">Dashboard de Acesso</h1>
          <p className="text-[#636363] text-lg mt-1">Integração em tempo real com leitor NFC</p>
        </div>
        
        <button 
          onClick={conectarESP32}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 shadow-lg"
        >
          🔌 Conectar Leitor NFC
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard count={chavesDisponiveis} label="Chaves Disponíveis" color="bg-[#36bd0c]" icon={imgKey} />
        <StatCard count={activities.length} label="Movimentações Ativas" color="bg-[#ffc34c]" icon={imgLandlord} />
        <StatCard count={0} label="Alertas" color="bg-[#cd2b2e]" icon={imgRemoveKey} />
      </div>

      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl overflow-x-auto">
        <div className="grid grid-cols-[80px_150px_1fr_120px_150px_150px] gap-4 px-6 py-4 border-b border-[#aaaaaa]">
          <span className="text-[#636363] text-base font-medium">Chave</span>
          <span className="text-[#636363] text-base font-medium">Descrição</span>
          <span className="text-[#636363] text-base font-medium">Retirada por</span>
          <span className="text-[#636363] text-base font-medium">Status</span>
          <span className="text-[#636363] text-base font-medium">Retirada</span>
          <span className="text-[#636363] text-base font-medium">Previsão</span>
        </div>

        {activities.map((item) => (
          <div key={item.id} className="grid grid-cols-[80px_150px_1fr_120px_150px_150px] gap-4 px-6 py-4 border-b border-[#dfdfdf] items-center">
            <div className="flex items-center gap-2">
              <img src={imgKey1} className="w-5 h-5 object-contain" />
              <span className="text-sm font-semibold text-black">{item.chave}</span>
            </div>
            <span className="text-sm font-semibold text-black">{item.descricao}</span>
            <span className="text-sm font-semibold text-black">{item.retiradaPor}</span>
            <div>
              <span className={`${statusColors[item.status] || 'bg-gray-400'} text-white text-sm font-semibold px-4 py-1.5 rounded-2xl inline-block`}>
                {item.status.replace("_", " ")}
              </span>
            </div>
            <span className="text-sm font-semibold text-black">{item.dataRetirada}</span>
            <span className="text-sm font-semibold text-black">{item.previsaoDevolucao}</span>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="p-6 text-center text-gray-500 font-medium">
            Nenhuma chave em uso no momento. Aguardando leitura NFC...
          </div>
        )}
      </div>
    </div>
  );
}