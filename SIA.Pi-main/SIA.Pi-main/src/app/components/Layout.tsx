import { Outlet, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Key,
  History,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import imgSia from "figma:asset/11355a9c842f200f18eafb09573031656629929c.png";
import imgLogoutWhite from "figma:asset/aea73b2e21c9cb38468f4ea5f25727deed43c00f.png";

const navItems = [
  { to: "/app", label: "Dashboard de Acesso", icon: LayoutDashboard, end: true },
  { to: "/app/usuarios", label: "Usuários", icon: Users },
  { to: "/app/chaves", label: "Chaves", icon: Key },
  { to: "/app/historico", label: "Histórico", icon: History },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings },
];

export function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#fcfcfc]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-[260px] min-w-[260px] bg-[#004aad] flex flex-col h-full transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="bg-white rounded-xl w-14 h-14 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={imgSia}
              alt="SIA"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-white font-bold text-2xl leading-tight">
              SIA
            </p>

            <p className="text-[#bfbfc2] text-sm leading-tight">
              Sistema Acadêmico
            </p>
          </div>
        </div>

        <p className="text-[#c0bbbb] text-sm font-semibold px-6 pt-4 pb-2">
          Navegação Principal
        </p>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#BFB5B5]/60 mt-4">
          <div className="flex items-center gap-3 px-6 py-4">
            <div className="w-9 h-9 rounded-full bg-[#ed6f20] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">MS</span>
            </div>

            <div>
              <p className="text-white font-medium text-base leading-tight">
                Mário Sobral
              </p>

              <p className="text-[#bfbfc2] text-xs">Admin</p>
            </div>
          </div>

          <div className="px-4 pb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/25 text-white font-medium text-base hover:bg-white/10 transition-colors"
            >
              <img
                src={imgLogoutWhite}
                alt="logout"
                className="w-5 h-5 object-contain"
              />

              Sair
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#ed6f20] shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-between px-4 lg:px-8 h-14 flex-shrink-0">
          <div className="flex items-center gap-3 lg:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <Menu size={28} />
            </button>

            <div className="h-9 border-l border-[#BFB5B5]/80 hidden lg:block" />

            <span className="text-white font-semibold text-sm lg:text-xl truncate">
              Sistema Integrado Acadêmico
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Sair
            <LogOut size={12} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}