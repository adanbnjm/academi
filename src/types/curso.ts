// Estructura utilizada por los datos simulados y pantallas existentes
export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  docente: string;
  creditos: number;
  cupo: number;
  inscritos: number;
  horario: string;
  categoria: string;
}
// Estructura real recibida desde la API
export interface DocenteCurso {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}

export interface CursoApi {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  creditos: number;
  cupo: number;
  inscritos: number;
  disponibles: number;
  docente: DocenteCurso | null;
}

export interface RespuestaCursos {
  success: boolean;
  data: CursoApi[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
