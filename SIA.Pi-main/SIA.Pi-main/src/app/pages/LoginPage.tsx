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

    try {
      // Esta é a "ponte" que liga o Front ao Back-end (que está a rodar na porta 8000)
      const resposta = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        localStorage.setItem("token", dados.access_token);
        navigate("/app"); // Vai para o painel principal
      } else {
        setErro("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor. Verifique se o Back-end está ligado.");
    } finally {
      setCarregando(false);
    }
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