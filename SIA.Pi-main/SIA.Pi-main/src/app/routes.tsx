import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ChavesPage } from "./pages/ChavesPage";
import { HistoricoPage } from "./pages/HistoricoPage";
import { ConfiguracoesPage } from "./pages/ConfiguracoesPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { CadastroUsuarioPage } from "./pages/CadastroUsuarioPage";
import { EditarUsuarioPage } from "./pages/EditarUsuarioPage";

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#004aad] mb-3">Página não encontrada</h1>
        <p className="text-[#636363] mb-6">
          A rota que você tentou acessar não existe ou foi movida.
        </p>
        <a
          href="/app"
          className="inline-flex items-center justify-center rounded-xl bg-[#004aad] px-5 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    Component: LoginPage,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: DashboardPage },
      { path: "chaves", Component: ChavesPage },
      { path: "historico", Component: HistoricoPage },
      { path: "configuracoes", Component: ConfiguracoesPage },
      { path: "usuarios", Component: UsuariosPage },
      { path: "usuarios/cadastro", Component: CadastroUsuarioPage },
      { path: "usuarios/editar/:id", Component: EditarUsuarioPage },
    ],
  },
  {
    path: "/usuarios",
    element: <Navigate to="/app/usuarios" replace />,
  },
  {
    path: "/usuarios/cadastro",
    element: <Navigate to="/app/usuarios/cadastro" replace />,
  },
  {
    path: "/usuarios/editar/:id",
    element: <Navigate to="/app/usuarios" replace />,
  },
  {
    path: "/chaves",
    element: <Navigate to="/app/chaves" replace />,
  },
  {
    path: "/historico",
    element: <Navigate to="/app/historico" replace />,
  },
  {
    path: "/configuracoes",
    element: <Navigate to="/app/configuracoes" replace />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
