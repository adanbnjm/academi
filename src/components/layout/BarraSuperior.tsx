import { Bell, Menu, Search } from "lucide-react";

import { Avatar } from "../ui/Avatar";
import { useAuthStore } from "../../store/useAuthStore";

const nombreRol = {
  ADMIN: "Administrador",
  DOCENTE: "Docente",
  ESTUDIANTE: "Estudiante",
};

export function BarraSuperior() {
  const usuario = useAuthStore((s) => s.usuario);

  if (!usuario) return null;

  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Buscar cursos..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm focus:border-marca-500 focus:bg-white focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notificaciones"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
          <Avatar nombre={nombreCompleto} tamano="sm" />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {nombreCompleto}
            </p>
            <p className="text-xs text-slate-500">{nombreRol[usuario.rol]} </p>
          </div>
        </div>
      </div>
    </header>
  );
}
