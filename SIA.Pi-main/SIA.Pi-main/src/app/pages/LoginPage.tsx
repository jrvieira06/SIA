import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    // MODO APRESENTAÇÃO: Espera 1 segundo para dar o efeito visual de carregamento
    setTimeout(() => {
      
      // Verificação simples e direta para a apresentação
      if (email === "adm@gmail.com" && senha === "adm123") {
        // Passou! Guarda um token falso e vai para o sistema
        localStorage.setItem("token", "liberado");
        navigate("/app"); 
      } else {
        // Errou o e-mail ou a palavra-passe
        setErro("Credenciais inválidas. Tente novamente.");
      }
      
      setCarregando(false);
    }, 1000); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">Login S.I.A.</h2>
        <input 
          type="email" 
          placeholder="E-mail" 
          className="w-full p-3 mb-4 border rounded-xl"
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <div className="relative mb-4">
          <input 
            type={showSenha ? "text" : "password"} 
            placeholder="Senha" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-3">
            {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {erro && <p className="mb-4 text-sm text-red-500">{erro}</p>}
        <button type="submit" disabled={carregando} className="w-full p-4 text-white bg-blue-600 rounded-xl">
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}