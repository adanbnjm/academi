import { GraduationCap, Lock, Mail, User } from "lucide-react";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { Tarjeta } from "../components/ui/Tarjeta";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function RegistroPage() {
  const navigate = useNavigate();
  const iniciarSesion = useAuthStore((s) => s.iniciarSesion);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formulario.password !== formulario.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setEnviando(true);

    try {
      const sesion = await authService.registrar({
        nombre: formulario.nombre,
        apellido: formulario.apellido,
        username: formulario.username,
        email: formulario.email || undefined, //email opcional
        password: formulario.password,
      });
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "No se pudo realizar el registro"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-marca-50 to-slate-100 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="rounded-xl bg-marca-600 p-2.5 text-white">
            <GraduationCap size={28} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Crea tu cuenta
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            El registro crea una cuenta de estudiante.
          </p>
        </div>

        <Tarjeta className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <CampoTexto
              id="nombre"
              etiqueta="Nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={formulario.nombre}
              onChange={handleChange}
              icono={<User size={18} />}
              required
            />
            <CampoTexto
              id="apellido"
              etiqueta="Apellido"
              name="apellido"
              placeholder="Ingresa tu apellido"
              value={formulario.apellido}
              onChange={handleChange}
              icono={<User size={18} />}
              required
            />
            <CampoTexto
              id="email"
              etiqueta="Correo electrónico"
              type="email"
              name="email"
              placeholder="tu.correo@ejemplo.com"
              value={formulario.email}
              onChange={handleChange}
              icono={<Mail size={18} />}
              required
            />

            <CampoTexto
              id="username"
              etiqueta="Nombre de Usuario"
              name="username"
              value={formulario.username}
              onChange={handleChange}
              placeholder="Ingresa tu nombre de usuario"
              ayuda="Minimo 3 caracteres"
              icono={<Mail size={18} />}
              required
            />

            <CampoTexto
              id="password"
              etiqueta="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formulario.password}
              onChange={handleChange}
              icono={<Lock size={18} />}
              ayuda="Mínimo 8 caracteres."
              required
            />
            <CampoTexto
              id="confirmar"
              etiqueta="Repite la contraseña"
              name="confirmar"
              type="password"
              placeholder="••••••••"
              value={formulario.confirmar}
              onChange={handleChange}
              icono={<Lock size={18} />}
              required
            />

            {error && <p>{error} </p>}

            <Boton type="submit" anchoCompleto disabled={enviando}>
              {enviando ? "Creando cuenta..." : "Crear Cuenta"}
            </Boton>
          </form>
        </Tarjeta>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?
          <Link
            to="/login"
            className="font-semibold text-marca-600 hover:text-marca-700"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
