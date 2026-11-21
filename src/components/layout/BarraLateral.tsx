import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Star,
  User,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

// Por ahora los enlaces son <a href="#">. Cuando agreguemos rutas, se cambian por <NavLink>.
const menuPrincipal = [
  { ruta: "/inicio", texto: "Inicio", icono: LayoutDashboard },
  { ruta: "/cursos", texto: "Cursos", icono: BookOpen },
  { ruta: "/inscripciones", texto: "Mis inscripciones", icono: ClipboardList },
  { ruta: "/calificaciones", texto: "Calificaciones", icono: Star },
  { ruta: "/perfil", texto: "Mi perfil", icono: User },
];

const menuAdmin = [
  { ruta: "/estudiantes", texto: "Estudiantes", icono: Users },
];

const claseEnlace = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-white/10 text-white"
      : "text-marca-100 hover:bg-white/5 hover:text-white"
  }`;

export function BarraLateral() {
  const Navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const cerrarSesion = useAuthStore((s) => s.cerrarSesion);

  const isAdmin = usuario?.rol === "ADMIN";

  const handleLogout = () => {
    cerrarSesion();
    Navigate("/login", { replace: true });
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-marca-900 lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-5">
        <div className="rounded-lg bg-marca-500 p-1.5 text-white">
          <GraduationCap size={22} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Academia FUNVAL</p>
          <p className="text-xs text-marca-200">Sistema académico</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 px-3 py-4">
        <div className="space-y-1">
          {menuPrincipal.map(({ ruta, texto, icono: Icono }) => (
            <NavLink key={ruta} to={ruta} className={claseEnlace}>
              <Icono size={18} />
              {texto}
            </NavLink>
          ))}
        </div>

        {isAdmin && (
          <div>
            <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-marca-200/70 uppercase">
              Administración
            </p>
            {menuAdmin.map(({ ruta, texto, icono: Icono }) => (
              <NavLink key={ruta} to={ruta} className={claseEnlace}>
                <Icono size={18} />
                {texto}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-marca-100 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
