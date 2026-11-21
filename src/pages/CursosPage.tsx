import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { Buscador } from "../components/cursos/Buscador";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";

export function CursosPage() {
  const [busqueda, setBusqueda] = useState("");

  const {
    data: respuesta,
    cargando,
    error,
    recargar,
  } = useApi(() => cursosService.getTodos());

  const cursos = respuesta?.data ?? [];

  const cursosFiltrados = cursos.filter((curso) => {
    const nombre = curso.nombre.toLowerCase();
    const codigo = curso.codigo.toLowerCase();
    const texto = busqueda.toLowerCase().trim();

    return nombre.includes(texto) || codigo.includes(texto);
  });

  return (
    <>
      <EncabezadoPagina
        titulo="Cursos disponibles"
        descripcion="Explora los cursos disponibles en nuestra academia."
      />

      <div className="mb-6">
        <Buscador valor={busqueda} onCambiar={setBusqueda} />
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

      {!cargando &&
        !error &&
        cursos.length > 0 &&
        cursosFiltrados.length === 0 && (
          <p className="py-8 text-center text-slate-500">
            No se encontraron cursos que coincidan con tu búsqueda.
          </p>
        )}

      {!cargando && !error && cursosFiltrados.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cursosFiltrados.map((curso) => (
            <TarjetaCurso key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </>
  );
}
