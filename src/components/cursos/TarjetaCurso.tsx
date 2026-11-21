import { User } from "lucide-react";
import type { CursoApi } from "../../types/curso";
import { BarraProgreso } from "../ui/BarraProgreso";
import { Boton } from "../ui/Boton";
import { Insignia } from "../ui/Insignia";
import { Tarjeta } from "../ui/Tarjeta";
import { useNavigate } from "react-router-dom";

interface Props {
  curso: CursoApi;
}

export function TarjetaCurso({ curso }: Props) {
  const lleno = curso.disponibles <= 0;
  const porcentaje = curso.cupo > 0 ? (curso.inscritos / curso.cupo) * 100 : 0;
  const navegar = useNavigate();

  return (
    <Tarjeta className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="h-2 bg-gradient-to-r from-marca-500 to-marca-700" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <Insignia color="azul">{curso.creditos} créditos</Insignia>
          <span className="font-mono text-xs text-slate-400">
            {curso.codigo}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          {curso.nombre}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {curso.descripcion}
        </p>

        <div className="mt-4 space-y-1.5 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <User size={15} className="text-slate-400" />
            {curso.docente
              ? `${curso.docente.nombre} ${curso.docente.apellido}`
              : "Docente no asignado"}
          </p>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Cupos ocupados</span>
            <span className="font-medium text-slate-700">
              {curso.inscritos}/{curso.cupo}
            </span>
          </div>

          <BarraProgreso valor={porcentaje} />

          <p className="text-xs text-slate-500">
            Cupos disponibles: {curso.disponibles}
          </p>
        </div>

        <div className="mt-5 flex gap-2 pt-1">
          <Boton
            variante="secundario"
            className="flex-1"
            onClick={() => navegar(`/cursos/${curso.id}`)}
          >
            Ver detalle
          </Boton>

          <Boton className="flex-1" disabled={lleno}>
            {lleno ? "Sin cupos" : "Inscribirme"}
          </Boton>
        </div>
      </div>
    </Tarjeta>
  );
}
