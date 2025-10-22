import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'

import "./App.css";

import Dashboard from './pages/Dashboard/Dashboard'
import CrearAvisos from './pages/CrearAvisos/CrearAvisos'
import InscribirAlumnos from './pages/InscribirAlumnos/InscribirAlumnos'
import ConsultarGrupos from './pages/ConsultarGrupos/ConsultarGrupos'
import ConsultarUsuarios from './pages/ConsultarUsuarios/ConsultarUsuarios'
import Sistemas_grupo from './pages/GrupoConsultado/Sistemas_.grupo.jsx'
import Derecho_grupo from './pages/GrupoConsultado/Derecho_grupo.jsx'
import Pedagogia_grupo from './pages/GrupoConsultado/Pedagogia_grupo.jsx'
import Psicologia_grupo from './pages/GrupoConsultado/Psicologia_grupo.jsx'
import Administracion_grupo from './pages/GrupoConsultado/Administracion_grupo.jsx'
// import Semestre6 from './pages/GrupoConsultado/Semestre6'

import Modificar_sistemas from './pages/ConsultarUsuarios/Grupos/Modificar_sistemas.jsx'
import Modificar_derecho from './pages/ConsultarUsuarios/Grupos/Modificar_derecho.jsx'
import Modificar_pedagogia from './pages/ConsultarUsuarios/Grupos/Modificar_pedagogia.jsx'
import Modificar_psicologia from './pages/ConsultarUsuarios/Grupos/Modificar_psicologia.jsx'
import Modificar_administracion from './pages/ConsultarUsuarios/Grupos/Modificar_administracion.jsx'

/* import Semestre6M from './pages/ConsultarUsuarios/Grupos/Semestre6' */

import ListarCalificaciones from './pages/ConsultarUsuarios/Calificaciones/ListarCalificaciones'
import ModificarInfoAlumno from './pages/ConsultarUsuarios/Calificaciones/ModificarInfoAlumno'
import SubirCalificaciones from './pages/ConsultarUsuarios/Calificaciones/SubirCalificaciones'
import Login from './pages/Login/Login'
import ModificarCalificacion from './pages/ConsultarUsuarios/Calificaciones/ModificarCalificacion'
import PruebaForm from './pages/prueba/PruebaForm'

function App() {


  return (
   <Router>
      <Routes>
        {/* <Route path='/' Component={Login}/>  */}
        <Route path='/' Component={Login}/>
        <Route path='/dashboard' Component={Dashboard}/>
        <Route path='/CrearAvisos' Component={CrearAvisos}/>
        <Route path='/InscribirAlumnos' Component={InscribirAlumnos}/>
        <Route path='/ConsultarGrupos' Component={ConsultarGrupos}/>
        <Route path='/ConsultarUsuarios' Component={ConsultarUsuarios}/>
        {/* LISTADO DE GRUPOS POR CARRERA*/}
        <Route path='/GruposSistemas' Component={Sistemas_grupo}/>
        <Route path='/GruposDerecho' Component={Derecho_grupo}/>
        <Route path='/GruposPedagogia' Component={Pedagogia_grupo}/>
        <Route path='/GruposPsicologia' Component={Psicologia_grupo}/>
        <Route path='/GruposAdministracion' Component={Administracion_grupo}/>

        {/* pendiente
        <Route path='/GrupoSemestre6' Component={Semestre6}/> */}


      {/* MODIFICADO DE USUARIOS */}
        <Route path='/ModificarGrupoSistemas' Component={Modificar_sistemas}/>
        <Route path='/ModificarGrupoDerecho' Component={Modificar_derecho}/>
        <Route path='/ModificarGrupoPedagogia' Component={Modificar_pedagogia}/>
        <Route path='/ModificarGrupoPsicologia' Component={Modificar_psicologia}/>
        <Route path='/ModificarGrupoAdministracion' Component={Modificar_administracion}/>
        {/* <Route path='/ModificarGrupoSemestre6' Component={Semestre6M}/> */}

        <Route path='/ListarCalisAlumno/:id' Component={ListarCalificaciones}/>
        <Route path='/ModificarInfoAlumno/:id' Component={ModificarInfoAlumno}/>
        <Route path='/SubirCalificacionesAlumno/:id' Component={SubirCalificaciones}/>
        <Route path='/ModificarCalificacion/:id' Component={ModificarCalificacion}/>
        <Route path='/Form' Component={PruebaForm}/>



      </Routes>
    </Router>
  );
}

export default App;
