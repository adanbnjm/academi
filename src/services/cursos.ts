import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { CursoApi, RespuestaCursos } from "../types/curso";

export const cursosService = {
  getTodos: async (): Promise<RespuestaCursos> => {
    const respuesta = await api.get<RespuestaCursos>("/cursos?limit=100");

    return respuesta.data;
  },

  getPorId: async (id: number): Promise<CursoApi> => {
    const respuesta = await api.get<RespuestaApi<CursoApi>>(`/cursos/${id}`);

    return respuesta.data.data;
  },
};
