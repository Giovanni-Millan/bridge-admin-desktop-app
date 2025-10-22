import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Swal from 'sweetalert2';

export default function SubirCalificaciones() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [id_materia, setId_materia] = useState("");
  const [parcial_1, setParcial_1] = useState("");
  const [parcial_2, setParcial_2] = useState("");
  const [parcial_3, setParcial_3] = useState("");

  // Lista de materias
  const materias = [
    { codigo: "ADM-01", nombre: "Fundamentos de Administración" },
    { codigo: "ADM-02", nombre: "Contabilidad" },
    { codigo: "ADM-03", nombre: "Economía" },
    { codigo: "ADM-04", nombre: "Finanzas" },
    { codigo: "ADM-05", nombre: "Mercadotecnia" },
    { codigo: "ADM-06", nombre: "Recursos Humanos" },
    { codigo: "ADM-07", nombre: "Planeación Estratégica" },
    { codigo: "ADM-08", nombre: "Comercio Internacional" },
    { codigo: "ADM-09", nombre: "Administración de Operaciones" },
    { codigo: "ADM-10", nombre: "Emprendimiento" },

    { codigo: "DER-01", nombre: "Introducción al Derecho" },
    { codigo: "DER-02", nombre: "Derecho Civil" },
    { codigo: "DER-03", nombre: "Derecho Penal" },
    { codigo: "DER-04", nombre: "Derecho Constitucional" },
    { codigo: "DER-05", nombre: "Derecho Laboral" },
    { codigo: "DER-06", nombre: "Derecho Mercantil" },
    { codigo: "DER-07", nombre: "Derecho Internacional" },
    { codigo: "DER-08", nombre: "Derecho Administrativo" },
    { codigo: "DER-09", nombre: "Derecho Procesal" },
    { codigo: "DER-10", nombre: "Ética Jurídica" },

    { codigo: "ISC-01", nombre: "Programación I" },
    { codigo: "ISC-02", nombre: "Programación II" },
    { codigo: "ISC-03", nombre: "Estructura de Datos" },
    { codigo: "ISC-04", nombre: "Bases de Datos" },
    { codigo: "ISC-05", nombre: "Redes de Computadoras" },
    { codigo: "ISC-06", nombre: "Ingeniería de Software" },
    { codigo: "ISC-07", nombre: "Sistemas Operativos" },
    { codigo: "ISC-08", nombre: "Arquitectura de Computadoras" },
    { codigo: "ISC-09", nombre: "Seguridad Informática" },
    { codigo: "ISC-10", nombre: "Inteligencia Artificial" },

    { codigo: "PED-01", nombre: "Teorías del Aprendizaje" },
    { codigo: "PED-02", nombre: "Didáctica General" },
    { codigo: "PED-03", nombre: "Planeación Educativa" },
    { codigo: "PED-04", nombre: "Evaluación del Aprendizaje" },
    { codigo: "PED-05", nombre: "Psicología Educativa" },
    { codigo: "PED-06", nombre: "Tecnología Educativa" },
    { codigo: "PED-07", nombre: "Gestión Escolar" },
    { codigo: "PED-08", nombre: "Sociología de la Educación" },
    { codigo: "PED-09", nombre: "Filosofía de la Educación" },
    { codigo: "PED-10", nombre: "Orientación Educativa" },

    { codigo: "PSI-01", nombre: "Introducción a la Psicología" },
    { codigo: "PSI-02", nombre: "Psicología del Desarrollo" },
    { codigo: "PSI-03", nombre: "Psicología Social" },
    { codigo: "PSI-04", nombre: "Psicología Clínica" },
    { codigo: "PSI-05", nombre: "Neuropsicología" },
    { codigo: "PSI-06", nombre: "Psicología Educativa" },
    { codigo: "PSI-07", nombre: "Psicología Organizacional" },
    { codigo: "PSI-08", nombre: "Evaluación Psicológica" },
    { codigo: "PSI-09", nombre: "Psicopatología" },
    { codigo: "PSI-10", nombre: "Psicoterapia" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id_materia || !parcial_1 || !parcial_2 || !parcial_3) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos antes de continuar.',
      });
      return;
    }

    axios.post(`http://localhost:4000/SubirCalificaciones/${id}`, {
      id_materia,
      parcial_1,
      parcial_2,
      parcial_3
    })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: '¡Calificaciones registradas!',
          text: 'Los datos se han guardado correctamente.',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(-1)
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Ocurrió un problema al registrar las calificaciones.',
        });
      });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar titulo="Subir Calificaciones" />

      {/* Botón regresar */}
      <div className="mt-10 ml-10">
        <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center bg-purple-200 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-300 transition mb-6"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Volver
                </button>
      </div>

      {/* Formulario principal */}
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-purple-200">
          <h2 className="text-2xl font-semibold text-center text-purple-800 mb-6">
            Registrar Calificaciones del Alumno
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selección de materia */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Materia</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={id_materia}
                onChange={e => setId_materia(e.target.value)}
              >
                <option value="">Selecciona una materia</option>

                <optgroup label="Administración">
                  {materias.filter(m => m.codigo.startsWith("ADM")).map(m => (
                    <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                  ))}
                </optgroup>

                <optgroup label="Derecho">
                  {materias.filter(m => m.codigo.startsWith("DER")).map(m => (
                    <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                  ))}
                </optgroup>

                <optgroup label="Ingeniería en Sistemas">
                  {materias.filter(m => m.codigo.startsWith("ISC")).map(m => (
                    <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                  ))}
                </optgroup>

                <optgroup label="Pedagogía">
                  {materias.filter(m => m.codigo.startsWith("PED")).map(m => (
                    <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                  ))}
                </optgroup>

                <optgroup label="Psicología">
                  {materias.filter(m => m.codigo.startsWith("PSI")).map(m => (
                    <option key={m.codigo} value={m.codigo}>{m.nombre}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Calificaciones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Parcial 1</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="0 - 10"
                  onChange={e => setParcial_1(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Parcial 2</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="0 - 10"
                  onChange={e => setParcial_2(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Parcial 3</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="0 - 10"
                  onChange={e => setParcial_3(e.target.value)}
                />
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-purple-900 transition-all duration-300 transform hover:scale-105"
              >
                Registrar Calificaciones
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
