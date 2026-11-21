import { useState } from "react";
import { ArrowLeft, BookOpen, GraduationCap, User, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { inscripcionesService } from "../services/inscripciones";
import { mensajeError } from "../lib/errores";
import { BarraProgreso } from "../components/ui/BarraProgreso";
import { Boton } from "../components/ui/Boton";
import { Insignia } from "../components/ui/Insignia";
import { Tarjeta } from "../components/ui/Tarjeta";

export function CursoDetallePage() {
  const { id } = useParams();
  const navegar = useNavigate();

  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorInscripcion, setErrorInscripcion] = useState("");

  const idCurso = Number(id);
  const idValido = Number.isInteger(idCurso) && idCurso > 0;

  const {
    data: curso,
    cargando,
    error,
    recargar,
  } = useApi(
    () =>
      idValido
        ? cursosService.getPorId(idCurso)
        : Promise.reject(new Error("ID de curso inválido")),
    [id],
  );

  const inscribirme = async () => {
    console.log("SE EJECUTÓ LA FUNCIÓN INSCRIBIRME");
    if (!curso || enviando || curso.disponibles <= 0) return;

    setEnviando(true);
    setMensaje("");
    setErrorInscripcion("");

    try {
      await inscripcionesService.crear(curso.id);

      setMensaje("¡Tu inscripción se realizó correctamente!");
      recargar();
    } catch (error) {
      setErrorInscripcion(
        mensajeError(error, "No se pudo realizar la inscripción"),
      );
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <p className="py-8 text-center text-slate-500">
        Cargando información del curso...
      </p>
    );
  }

  if (error || !curso) {
    return (
      <div className="py-8 text-center">
        <p className="mb-3 text-red-600">
          {error ?? "No se encontró el curso."}
        </p>

        <div className="flex justify-center gap-2">
          <Boton variante="secundario" onClick={() => navegar("/cursos")}>
            Volver a cursos
          </Boton>

          <Boton onClick={recargar}>Reintentar</Boton>
        </div>
      </div>
    );
  }

  const porcentaje = curso.cupo > 0 ? (curso.inscritos / curso.cupo) * 100 : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => navegar("/cursos")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={16} />
        Volver a cursos
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tarjeta className="overflow-hidden">
            <div className="bg-gradient-to-r from-marca-700 to-marca-500 p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Insignia color="azul">{curso.creditos} créditos</Insignia>

                <span className="font-mono text-xs text-white">
                  {curso.codigo}
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                {curso.nombre}
              </h1>

              <p className="mt-2 max-w-2xl text-white/90">
                {curso.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-2 divide-slate-100 sm:grid-cols-3 sm:divide-x">
              <div className="p-4">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <User size={14} />
                  Docente
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {curso.docente
                    ? `${curso.docente.nombre} ${curso.docente.apellido}`
                    : "Docente no asignado"}
                </p>
              </div>

              <div className="p-4">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <GraduationCap size={14} />
                  Créditos
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {curso.creditos}
                </p>
              </div>

              <div className="p-4">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={14} />
                  Cupos
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {curso.inscritos} de {curso.cupo}
                </p>
              </div>
            </div>
          </Tarjeta>
        </div>

        <div>
          <Tarjeta className="p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-marca-50 p-2.5 text-marca-600">
                <BookOpen size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Disponibilidad</p>
                <p className="font-semibold text-slate-900">
                  {curso.disponibles > 0
                    ? "Inscripciones abiertas"
                    : "Sin cupos"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Cupos ocupados</span>
                <span className="font-semibold text-slate-800">
                  {curso.inscritos}/{curso.cupo}
                </span>
              </div>

              <BarraProgreso valor={porcentaje} />

              <p className="text-xs text-slate-500">
                Cupos disponibles: {curso.disponibles}
              </p>
            </div>

            {mensaje && (
              <p className="mt-4 text-sm text-green-600">{mensaje}</p>
            )}

            {errorInscripcion && (
              <p className="mt-4 text-sm text-red-600">{errorInscripcion}</p>
            )}

            <Boton
              anchoCompleto
              className="mt-6"
              disabled={enviando || curso.disponibles <= 0}
              onClick={inscribirme}
            >
              {enviando ? "Inscribiendo..." : "Inscribirme"}
            </Boton>
          </Tarjeta>
        </div>
      </div>
    </>
  );
}
