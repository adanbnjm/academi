import { LoginPage } from "./pages/LoginPage";
// import { RegistroPage } from "./pages/RegistroPage";
// import { InicioPage } from "./pages/InicioPage";
import { CursosPage } from "./pages/CursosPage";
import { Navigate, Routes, Route } from "react-router-dom";
import { RegistroPage } from "./pages/RegistroPage";
import { PlantillaApp } from "./components/layout/PlantillaApp";
import { InicioPage } from "./pages/InicioPage";
import { PerfilPage } from "./pages/PerfilPage";
import { NoEncontradaPage } from "./pages/NoEncontradaPage";
import { RutaProtegida } from "./components/layout/RutaProtegida";
import { EstudiantesPage } from "./pages/EstudiantesPage";
import { CursoDetallePage } from "./pages/CursoDetallePage";
// import { MisInscripcionesPage } from "./pages/MisInscripcionesPage";
// import { CalificacionesPage } from "./pages/CalificacionesPage";
// import { EstudiantesPage } from "./pages/EstudiantesPage";
// import { PerfilPage } from "./pages/PerfilPage";
// import { NoEncontradaPage } from "./pages/NoEncontradaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/registro" element={<RegistroPage></RegistroPage>} />
      {/*Configuramos la plantilla que venia en el diseño (Menu lateral, header, el contenido)*/}

      <Route element={<PlantillaApp />}>
        <Route path="/inicio" element={<InicioPage></InicioPage>}></Route>
        {/*  <Route path="/cursos" element={<CursosPage />}></Route>*/}

        <Route path="/perfil" element={<PerfilPage />} />

        {/*Agregar las rutas de estudiantes, inscripciones*/}

        {/**RUTAS QUE solo puede ingresar el administrador*/}
        <Route element={<RutaProtegida roles={["ADMIN"]} />}>
          <Route
            path="/estudiantes"
            element={<EstudiantesPage></EstudiantesPage>}
          ></Route>
        </Route>

        {/**RUTAS QUE solo puede ingresar el estudianter*/}
        <Route element={<RutaProtegida roles={["ESTUDIANTE"]} />}>
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/cursos/:id" element={<CursoDetallePage />} />
        </Route>
      </Route>

      <Route path="" element={<NoEncontradaPage />}></Route>
    </Routes>
  );
}

export default App;
