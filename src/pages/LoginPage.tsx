import { GraduationCap } from "lucide-react";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { authService } from "../services/auth";
import { mensajeError } from "../lib/errores";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const iniciarSesion = useAuthStore((s) => s.iniciarSesion);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  // en caso de que ya haya una sesion, redireccionamos a INICIO
  if (token) {
    return <Navigate to="/inicio" replace />;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const sesion = await authService.login({ username, password });
      iniciarSesion(sesion.token, sesion.usuario);
      (navigate("/inicio"), { replace: true });
    } catch (err) {
      setError(mensajeError(err, "Datos incorrectos"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Lado izquierdo: bienvenida (se oculta en celular) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-marca-900 p-12 text-white lg:flex">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marca-600/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-marca-500/20 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="rounded-lg bg-marca-500 p-2">
            <GraduationCap size={26} />
          </div>
          <span className="text-lg font-bold">Academia FUNVAL</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl leading-tight font-bold">
            Aprende, inscríbete y sigue tu progreso en un solo lugar.
          </h2>
          <p className="mt-4 text-marca-100">
            Consulta los cursos disponibles, revisa tus calificaciones y
            gestiona tus inscripciones.
          </p>
        </div>

        <div className="relative flex gap-8 text-sm">
          <div>
            <p className="text-2xl font-bold">+40</p>
            <p className="text-marca-200">Cursos</p>
          </div>
          <div>
            <p className="text-2xl font-bold">+1.200</p>
            <p className="text-marca-200">Estudiantes</p>
          </div>
          <div>
            <p className="text-2xl font-bold">35</p>
            <p className="text-marca-200">Docentes</p>
          </div>
        </div>
      </div>

      {/* Lado derecho: formulario */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="rounded-lg bg-marca-600 p-1.5 text-white">
              <GraduationCap size={22} />
            </div>
            <span className="font-bold text-slate-900">Academia FUNVAL</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa con tu correo institucional.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <CampoTexto
              id="username"
              etiqueta="Usuario"
              placeholder="bsegales"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <CampoTexto
              id="password"
              etiqueta="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-marca-600"
                />
                Recordarme
              </label>
              <a
                href="#"
                className="font-medium text-marca-600 hover:text-marca-700"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Boton type="submit" anchoCompleto disabled={enviando}>
              {enviando ? "Ingresando..." : "Ingresar"}
            </Boton>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            ¿No tienes cuenta?
            <Link
              to="/registro"
              className="font-semibold text-marca-600 hover:text-marca-700"
            >
              Regístrate como estudiante
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
