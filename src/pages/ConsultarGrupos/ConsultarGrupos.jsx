import React from 'react'
import Navbar from '../../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLaptopCode, faGavel, faChalkboardTeacher, faBrain, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ConsultarGrupos() {
  const navigate = useNavigate();

  const carreras = [
    { id: 1, nombre: 'Ingeniería en Sistemas', ruta: '/GruposSistemas', icono: faLaptopCode },
    { id: 2, nombre: 'Derecho', ruta: '/GruposDerecho', icono: faGavel },
    { id: 3, nombre: 'Pedagogía', ruta: '/GruposPedagogia', icono: faChalkboardTeacher },
    { id: 4, nombre: 'Psicología', ruta: '/GruposPsicologia', icono: faBrain },
    { id: 5, nombre: 'Administración', ruta: '/GruposAdministracion', icono: faMoneyBillTrendUp },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <Navbar titulo="Consultar Grupos" />

      {/* Botón de regreso */}
      <div className="mt-8 ml-10">
        <button
          onClick={() => navigate('/Dashboard')}
          className="inline-flex items-center gap-2 bg-purple-200 text-purple-900 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-purple-300 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Regresar</span>
        </button>
      </div>

      {/* Encabezado */}
      <section className="text-center mt-12 mb-10">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Selecciona una carrera</h1>
        <p className="text-purple-700 text-lg">Consulta los grupos por carrera</p>
      </section>

      {/* Cuadrícula de carreras */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-16">
        {carreras.map((carrera) => (
          <motion.div
            key={carrera.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(carrera.ruta)}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6 border border-purple-200"
          >
            <FontAwesomeIcon icon={carrera.icono} className="text-purple-700 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-purple-900 mb-2 text-center">{carrera.nombre}</h2>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
