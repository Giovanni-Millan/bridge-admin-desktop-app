import React from "react";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLaptopCode,
  faGavel,
  faChalkboardTeacher,
  faBrain,
  faMoneyBillTrendUp,
  faDumbbell,
  faFingerprint,
  faPeopleRoof,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ModificarGrupos() {
  const navigate = useNavigate();

  const modalidades = [
    {
      nombre: "Escolarizadas",
      color: "bg-purple-600",
      carreras: [
        { nombre: "Ingeniería en Sistemas", ruta: "/ModificarGrupoSistemas", icono: faLaptopCode },
        { nombre: "Derecho", ruta: "/ModificarGrupoDerecho", icono: faGavel },
        { nombre: "Pedagogía", ruta: "/ModificarGrupoPedagogia", icono: faChalkboardTeacher },
        { nombre: "Psicología", ruta: "/ModificarGrupoPsicologia", icono: faBrain },
        { nombre: "Administración", ruta: "/ModificarGrupoAdministracion", icono: faMoneyBillTrendUp },
        { nombre: "Ciencias del Deporte", ruta: "/ModificarGrupoDeportes", icono: faDumbbell },
        { nombre: "Contaduría", ruta: "/ModificarGrupoContaduria", icono: faMoneyBillTrendUp },
        { nombre: "Criminología", ruta: "/ModificarGrupoCriminologia", icono: faFingerprint },
        { nombre: "Trabajo Social", ruta: "/ModificarGrupoTrabajoSocial", icono: faPeopleRoof },
        { nombre: "Ingeniería Industrial", ruta: "/ModificarGrupoIndustrial", icono: faIndustry },
      ],
    },
    {
      nombre: "Sabatinas",
      color: "bg-green-600",
      carreras: [
        { nombre: "Ingeniería en Sistemas", ruta: "/ModificarGrupoSistemasSabatino", icono: faLaptopCode },
        { nombre: "Derecho", ruta: "/ModificarGrupoDerechoSabatino", icono: faGavel },
        { nombre: "Pedagogía", ruta: "/ModificarGrupoPedagogiaSabatino", icono: faChalkboardTeacher },
        { nombre: "Psicología", ruta: "/ModificarGrupoPsicologiaSabatino", icono: faBrain },
        { nombre: "Administración", ruta: "/ModificarGrupoAdministracionSabatino", icono: faMoneyBillTrendUp },
        { nombre: "Ciencias del Deporte", ruta: "/ModificarGrupoDeportesSabatino", icono: faDumbbell },
        { nombre: "Contaduría", ruta: "/ModificarGrupoContaduriaSabatino", icono: faMoneyBillTrendUp },
        { nombre: "Criminología", ruta: "/ModificarGrupoCriminologiaSabatino", icono: faFingerprint },
        { nombre: "Trabajo Social", ruta: "/ModificarGrupoTrabajoSocialSabatino", icono: faPeopleRoof },
        { nombre: "Ingeniería Industrial", ruta: "/ModificarGrupoIndustrialSabatino", icono: faIndustry },
      ],
    },
    {
      nombre: "Dominicales",
      color: "bg-blue-600",
      carreras: [
        { nombre: "Ingeniería en Sistemas", ruta: "/ModificarGrupoSistemasDominical", icono: faLaptopCode },
        { nombre: "Derecho", ruta: "/ModificarGrupoDerechoDominical", icono: faGavel },
        { nombre: "Pedagogía", ruta: "/ModificarGrupoPedagogiaDominical", icono: faChalkboardTeacher },
        { nombre: "Psicología", ruta: "/ModificarGrupoPsicologiaDominical", icono: faBrain },
        { nombre: "Administración", ruta: "/ModificarGrupoAdministracionDominical", icono: faMoneyBillTrendUp },
        { nombre: "Ciencias del Deporte", ruta: "/ModificarGrupoDeportesDominical", icono: faDumbbell },
        { nombre: "Contaduría", ruta: "/ModificarGrupoContaduriaDominical", icono: faMoneyBillTrendUp },
        { nombre: "Criminología", ruta: "/ModificarGrupoCriminologiaDominical", icono: faFingerprint },
        { nombre: "Trabajo Social", ruta: "/ModificarGrupoTrabajoSocialDominical", icono: faPeopleRoof },
        { nombre: "Ingeniería Industrial", ruta: "/ModificarGrupoIndustrialDominical", icono: faIndustry },
      ],
    },
    {
      nombre: "Virtuales",
      color: "bg-yellow-500",
      carreras: [
        { nombre: "Ingeniería en Sistemas", ruta: "/ModificarGrupoSistemasVirtual", icono: faLaptopCode },
        { nombre: "Derecho", ruta: "/ModificarGrupoDerechoVirtual", icono: faGavel },
        { nombre: "Pedagogía", ruta: "/ModificarGrupoPedagogiaVirtual", icono: faChalkboardTeacher },
        { nombre: "Psicología", ruta: "/ModificarGrupoPsicologiaVirtual", icono: faBrain },
        { nombre: "Administración", ruta: "/ModificarGrupoAdministracionVirtual", icono: faMoneyBillTrendUp },
        { nombre: "Ciencias del Deporte", ruta: "/ModificarGrupoDeportesVirtual", icono: faDumbbell },
        { nombre: "Contaduría", ruta: "/ModificarGrupoContaduriaVirtual", icono: faMoneyBillTrendUp },
        { nombre: "Criminología", ruta: "/ModificarGrupoCriminologiaVirtual", icono: faFingerprint },
        { nombre: "Trabajo Social", ruta: "/ModificarGrupoTrabajoSocialVirtual", icono: faPeopleRoof },
        { nombre: "Ingeniería Industrial", ruta: "/ModificarGrupoIndustrialVirtual", icono: faIndustry },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <Navbar titulo="Modificar Grupos" />

      {/* Botón de regreso */}
      <div className="mt-8 ml-10">
        <button
          onClick={() => navigate("/Dashboard")}
          className="inline-flex items-center gap-2 bg-purple-200 text-purple-900 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-purple-300 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Regresar</span>
        </button>
      </div>

      {/* Encabezado */}
      <section className="text-center mt-12 mb-10">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Selecciona una carrera y modalidad</h1>
        <p className="text-purple-700 text-lg">Modifica los grupos disponibles</p>
      </section>

      {/* Secciones por modalidad */}
      <section className="space-y-12 px-10 pb-16">
        {modalidades.map((mod, idx) => (
          <div key={idx}>
            <h2 className={`text-2xl font-bold text-white p-3 rounded-xl ${mod.color} mb-6`}>
              {mod.nombre}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mod.carreras.map((carrera, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(carrera.ruta)}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 p-5 border border-purple-200"
                >
                  <div className={`${mod.color} p-3 rounded-full text-white flex items-center justify-center`}>
                    <FontAwesomeIcon icon={carrera.icono} size="lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">{carrera.nombre}</h3>
                    <p className="text-sm text-purple-600">{mod.nombre}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
