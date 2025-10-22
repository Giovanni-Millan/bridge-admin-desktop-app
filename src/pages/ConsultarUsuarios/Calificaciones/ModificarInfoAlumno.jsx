import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ModificarInfoAlumno() {
  const [alumno, setAlumno] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    curp: '',
    correo: '',
    contraseña: '',
    telefono: '',
    direccion: '',
    cuatrimestre: '',
    carrera: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/ConsultarInfoUsuarioId/${id}`);
        const data = res.data;

        setAlumno({
          nombre: data.nombre || '',
          apellido_paterno: data.apellido_paterno || '',
          apellido_materno: data.apellido_materno || '',
          fecha_nacimiento: data.fecha_nacimiento || '',
          curp: data.curp || '',
          correo: data.correo || '',
          contraseña: '',
          telefono: data.telefono || '',
          direccion: data.direccion || '',
          cuatrimestre: data.cuatrimestre || '',
          carrera: data.carrera || '',
        });
      } catch (error) {
        console.error('Error al obtener el alumno:', error);
        Swal.fire('Error', 'No se pudo cargar la información del alumno', 'error');
      }
    };

    fetchAlumno();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
      curp,
      correo,
      contraseña,
      telefono,
      direccion,
      cuatrimestre,
      carrera,
    } = alumno;

    if (
      !nombre || !apellido_paterno || !apellido_materno || !fecha_nacimiento || !curp ||
      !correo || !telefono || !direccion || !cuatrimestre || !carrera
    ) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos obligatorios', 'warning');
      return;
    }

    try {
      const payload = {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        curp,
        correo,
        telefono,
        direccion,
        cuatrimestre,
        carrera,
      };

      if (contraseña) payload.contraseña = contraseña;

      await axios.patch(`http://localhost:4000/ActualizarUsuarios/${id}`, payload);
      Swal.fire('Actualizado', 'Los datos del alumno se actualizaron correctamente', 'success');
      navigate(-1)
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo actualizar la información', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar titulo="Modificar Información del Alumno" />

      <div className="mt-6 px-6">
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-purple-200 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-300 transition"
            >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Volver
        </button>
      </div>

      <div className="flex justify-center mt-8 px-4">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Actualizar Alumno
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={alumno.nombre}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
              <input
                type="text"
                name="apellido_paterno"
                value={alumno.apellido_paterno}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido Materno</label>
              <input
                type="text"
                name="apellido_materno"
                value={alumno.apellido_materno}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={alumno.fecha_nacimiento}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CURP</label>
              <input
                type="text"
                name="curp"
                value={alumno.curp}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input
                type="email"
                name="correo"
                value={alumno.correo}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña <span className="text-xs text-gray-500">(solo si deseas cambiarla)</span>
              </label>
              <input
                type="password"
                name="contraseña"
                value={alumno.contraseña}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={alumno.telefono}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={alumno.direccion}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cuatrimestre</label>
              <input
                type="number"
                name="cuatrimestre"
                value={alumno.cuatrimestre}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* CAMBIO A SELECT: CARRERA */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Carrera</label>
              <select
                name="carrera"
                value={alumno.carrera}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Selecciona una carrera</option>
                <option value="Ingeniería en Sistemas computacionales">Ingeniería en Sistemas Computacionales</option>
                <option value="Derecho">Derecho</option>
                <option value="Pedagogía">Pedagogía</option>
                <option value="Psicología">Psicología</option>
                <option value="Administración">Administración</option>
              </select>
            </div>

            <div className="md:col-span-2 text-center mt-6">
              <button
                type="submit"
                className="bg-purple-700 text-white px-10 py-2 rounded-md hover:bg-purple-800 transition"
              >
                Actualizar Alumno
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
