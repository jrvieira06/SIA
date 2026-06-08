import { useState } from "react";
import { useNavigate } from "react-router";

// FormField atualizado para refletir as mudanças no estado pai
function FormField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black text-sm opacity-80">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 bg-[#e6e6e6] rounded-lg text-sm text-black/40 focus:outline-none focus:ring-1 focus:ring-[#004aad]"
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

export function EditarUsuarioPage() {
  const navigate = useNavigate();

  // Estado centralizado com os dados iniciais
  const [formData, setFormData] = useState({
    nome: "Ágatha Moreira de Souza",
    email: "agatha.moreira@edu.pe.senac.br",
    matricula: "53456",
    cpf: "092.001.435-19",
    telefone: "(81)99568-4895",
    departamento: "Acadêmico",
    funcao: "Professora Inglês",
  });

  const [tipoUsuario, setTipoUsuario] = useState("professor");
  const [statusAcesso, setStatusAcesso] = useState("ativo");

  // Função para salvar sem mensagens de alerta
  const handleConfirmar = () => {
    const usuarioAtualizado = {
      ...formData,
      tipoUsuario,
      statusAcesso,
    };

    // Simulação de salvamento
    console.log("Salvando alterações:", usuarioAtualizado);

    // Redireciona direto para a listagem
    navigate("/app/usuarios");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[#001c42] text-2xl md:text-4xl font-semibold">Editar Usuário</h1>
        <p className="text-[#636363] text-base md:text-lg mt-1">Edite informações do usuário</p>
      </div>

      <div className="bg-white border-2 border-[#dfdfdf] rounded-2xl p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            label="Nome Completo"
            value={formData.nome}
            onChange={(val) => setFormData({ ...formData, nome: val })}
          />
          <div className="hidden md:block" />
          <FormField
            label="E-mail Institucional"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
          />
          <FormField
            label="Matrícula"
            value={formData.matricula}
            onChange={(val) => setFormData({ ...formData, matricula: val })}
          />
          <FormField
            label="CPF"
            value={formData.cpf}
            onChange={(val) => setFormData({ ...formData, cpf: val })}
          />
          <FormField
            label="Telefone"
            value={formData.telefone}
            onChange={(val) => setFormData({ ...formData, telefone: val })}
          />
          <FormField
            label="Departamento"
            value={formData.departamento}
            onChange={(val) => setFormData({ ...formData, departamento: val })}
          />
          <FormField
            label="Função"
            value={formData.funcao}
            onChange={(val) => setFormData({ ...formData, funcao: val })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-black text-sm opacity-80 mb-2 font-medium">Tipo de Usuário</p>
            <div className="flex gap-6">
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
            <p className="text-black text-sm opacity-80 mb-2 font-medium">Status do Acesso</p>
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

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-10">
          <button
            onClick={() => navigate("/app/usuarios")}
            className="w-full md:w-auto bg-[rgba(0,74,173,0.5)] border-2 border-[#004aad] text-white font-bold text-lg px-12 py-3 rounded-2xl hover:bg-[rgba(0,74,173,0.7)] transition-colors order-2 md:order-1"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="w-full md:w-auto bg-[#004aad] border-2 border-[#004aad] text-white font-bold text-lg px-12 py-3 rounded-2xl hover:bg-[#003d91] transition-colors order-1 md:order-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}