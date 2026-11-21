import { api } from "../lib/axios";
import type { RespuestaCursos } from "../types/curso";

export const cursosService = {
  getTodos: async (): Promise<RespuestaCursos> => {
    const respuesta = await api.get<RespuestaCursos>("/cursos");

    return respuesta.data;
  },
};
