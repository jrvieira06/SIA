import { useState } from "react";
import {
  Settings,
  Cpu,
  User,
  Lock,
  Accessibility,
  Plus,
} from "lucide-react";

type Section =
  | "geral"
  | "dispositivo"
  | "dados-pessoais"
  | "alterar-senha"
  | "acessibilidade";

const sideNavItems: { id: Section; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "geral", label: "Geral", icon: Settings },
  { id: "dispositivo", label: "Dispositivo IoT", icon: Cpu },
  { id: "dados-pessoais", label: "Dados Pessoais", icon: User },
  { id: "alterar-senha", label: "Alterar Senha", icon: Lock },
  { id: "acessibilidade", label: "Acessibilidade", icon: Accessibility },
];

function InputField({
  label,
  value,
  placeholder,
}: {
  label: string;
  value?: string;
  placeholder?: string;
}) {
  const [val, setVal] = useState(value ?? "");
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black text-sm opacity-80">{label}</label>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-3 bg-[rgba(230,230,230,0.4)] rounded-lg text-base text-black/40 focus:outline-none focus:ring-1 focus:ring-[#004aad]"
      />
    </div>
  );
}

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={onChange}
        className={`w-5 h-5 rounded border border-[#bcbcbc] flex-shrink-0 cursor-pointer ${
          checked ? "bg-[#004aad] border-[#004aad]" : "bg-transparent"
        }`}
      />
      <span className="text-black text-sm opacity-80">{label}</span>
    </label>
  );
}

function DadosPessoaisSection() {
  const [tipoUsuario, setTipoUsuario] = useState("funcionario");
  const [statusAcesso, setStatusAcesso] = useState("ativo");

  return (
    <div>
      <h2 className="text-[#001c42] text-2xl font-semibold mb-1">Dados Pessoais</h2>
      <p className="text-[#636363] text-base mb-6">Dados do administrador</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <InputField label="Nome Completo" value="Mário Sobral de Lima" />
        <div />
        <InputField label="E-mail Institucional" value="mario.sobral@edu.pe.senac.br" />
        <InputField label="Matrícula" value="12456" />
        <InputField label="CPF" value="156.015.456-01" />
        <InputField label="Telefone" value="(81)99563-5931" />
        <InputField label="Departamento" value="Portaria" />
        <InputField label="Função" value="Porteiro" />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <p className="text-black text-sm opacity-80 mb-2">Tipo de Usuário</p>
          <div className="flex flex-col md:flex-row gap-6">
            <RadioOption
              label="Funcionário"
              checked={tipoUsuario === "funcionario"}
              onChange={() => setTipoUsuario("funcionario")}
            />
            <RadioOption
              label="Professor(a)"
              checked={tipoUsuario === "professor"}
              onChange={() => setTipoUsuario("professor")}
            />
          </div>
        </div>
        <div>
          <p className="text-black text-sm opacity-80 mb-2">Status do Acesso</p>
          <div className="flex gap-6">
            <RadioOption
              label="Ativo"
              checked={statusAcesso === "ativo"}
              onChange={() => setStatusAcesso("ativo")}
            />
            <RadioOption
              label="Inativo"
              checked={statusAcesso === "inativo"}
              onChange={() => setStatusAcesso("inativo")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-end mt-8">
        <button className="bg-[#004aad] text-white font-bold text-lg px-10 py-3 rounded-2xl hover:bg-[#003d91] transition-colors">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

function AlterarSenhaSection() {
  return (
    <div>
      <h2 className="text-[#001c42] text-2xl font-semibold mb-1">Alterar Senha</h2>
      <p className="text-[#636363] text-base mb-6">Gerencie a segurança do seu acesso</p>

      <div className="grid grid-cols-2 gap-6">
        <InputField label="Senha Atual" placeholder="Digite sua senha atual" />
        <div />
        <InputField label="Nova Senha" placeholder="Digite a nova senha" />
        <InputField label="Confirmar Nova Senha" placeholder="Confirme a nova senha" />
      </div>

      <div className="flex justify-end mt-8">
        <button className="bg-[#004aad] text-white font-bold text-lg px-10 py-3 rounded-2xl hover:bg-[#003d91] transition-colors">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

function GeralSection() {
  return (
    <div>
      <h2 className="text-[#001c42] text-2xl font-semibold mb-1">Geral</h2>
      <p className="text-[#636363] text-base mb-6">Configurações gerais do sistema</p>
      <p className="text-[#636363] text-base">Configurações gerais disponíveis em breve.</p>
    </div>
  );
}

function DispositivoSection() {
  return (
    <div>
      <h2 className="text-[#001c42] text-2xl font-semibold mb-1">Dispositivo IoT</h2>
      <p className="text-[#636363] text-base mb-6">Gerenciamento de dispositivos IoT</p>
      <p className="text-[#636363] text-base">Configurações de dispositivos disponíveis em breve.</p>
    </div>
  );
}

function AcessibilidadeSection() {
  return (
    <div>
      <h2 className="text-[#001c42] text-2xl font-semibold mb-1">Acessibilidade</h2>
      <p className="text-[#636363] text-base mb-6">Ajuste as Configurações de acessibilidade</p>
      <p className="text-[#636363] text-base">Configurações de acessibilidade disponíveis em breve.</p>
    </div>
  );
}

export function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState<Section>("dados-pessoais");

  const renderSection = () => {
    switch (activeSection) {
      case "dados-pessoais":
        return <DadosPessoaisSection />;
      case "alterar-senha":
        return <AlterarSenhaSection />;
      case "geral":
        return <GeralSection />;
      case "dispositivo":
        return <DispositivoSection />;
      case "acessibilidade":
        return <AcessibilidadeSection />;
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#001c42] text-4xl font-semibold">Configurações</h1>
        <p className="text-[#636363] text-lg mt-1">Configurações do Sistema</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left nav */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1 overflow-x-auto">
          {sideNavItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-semibold transition-colors text-left ${
                activeSection === id
                  ? "text-[#004aad]"
                  : "text-[#636363] hover:bg-gray-100"
              }`}
            >
              <Icon size={22} className={activeSection === id ? "text-[#004aad]" : "text-[#636363]"} />
              {label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="flex-1 bg-white border-2 border-[#dfdfdf] rounded-2xl p-8">
          {renderSection()}
        </div>
      </div>

      {/* Security section */}
      <div className="mt-6 bg-white border-2 border-[#dfdfdf] rounded-2xl p-8">
        <h2 className="text-black text-2xl font-semibold mb-1">Segurança da Conta</h2>
        <p className="text-[#636363] text-base">Gerencie a segurança do seu acesso</p>
      </div>
    </div>
  );
}
