import { api } from "../lib/axios";

export const inscripcionesService = {
  crear: async (cursoId: number): Promise<void> => {
    await api.post("/inscripciones", {
      cursoId,
    });
  },
};
