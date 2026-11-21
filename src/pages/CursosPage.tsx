import { Search } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";

const categorias = ["Todos"];

export function CursosPage() {
  const {
    data: respuesta,
    cargando,
    error,
    recargar,
  } = useApi(() => cursosService.getTodos());

  const cursos = respuesta?.data ?? [];

  return (
    <>
      <EncabezadoPagina
        titulo="Cursos disponibles"
        descripcion="Explora los cursos disponibles en nuestra academia."
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative lg:w-80">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Buscar por nombre o código..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3 pl-10 text-sm focus:border-marca-500 focus:ring-4 focus:ring-marca-100 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className="rounded-full bg-marca-600 px-3.5 py-1.5 text-sm font-medium text-white"
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {cargando && (
        <p className="py-8 text-center text-slate-500">Cargando...</p>
      )}

      {error && (
        <div className="py-8 text-center">
          <p className="mb-3 text-red-600">{error}</p>
          <button
            onClick={recargar}
            className="rounded-lg bg-marca-600 px-4 py-2 text-white"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && cursos.length === 0 && (
        <p className="py-8 text-center text-slate-500">
          No hay cursos disponibles.
        </p>
      )}

      {!cargando && !error && cursos.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cursos.map((curso) => (
            <TarjetaCurso key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </>
  );
}
