import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ModificarCalificacion() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});
  const [parcial_1, setParcial_1] = useState('');
  const [parcial_2, setParcial_2] = useState('');
  const [parcial_3, setParcial_3] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/ConsultarCalisPorCaliId/${id}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setData(info);
          setParcial_1(info.parcial_1);
          setParcial_2(info.parcial_2);
          setParcial_3(info.parcial_3);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parcial_1 === '' || parcial_2 === '' || parcial_3 === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos antes de continuar.',
        confirmButtonColor: '#7e22ce',
      });
      return;
    }

    Swal.fire({
      title: '¿Guardar cambios?',
      text: "Se actualizarán las calificaciones del alumno.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7e22ce',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://192.168.1.198:4000/ModificarCalis/${id}`, {
          parcial_1, parcial_2, parcial_3
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Calificación actualizada!',
            text: 'Los cambios se han guardado correctamente.',
            confirmButtonColor: '#7e22ce',
          });
          navigate(-1);
        })
        .catch(err => console.log(err));
      }
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar titulo="Modificar Calificación" />

      <div className="max-w-3xl mx-auto mt-10 px-6">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center bg-purple-200 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-300 transition mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver
        </button>

        {/* Tarjeta principal */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
            Modificar calificaciones de:
          </h2>

          {data.id_materia ? (
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-700">
                Código de materia: <span className="text-purple-700">{data.id_materia}</span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Nombre: <span className="text-purple-700">{data.nombre_materia}</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-6">Cargando información...</p>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Parcial 1</label>
              <input
                type="number"
                value={parcial_1}
                onChange={(e) => setParcial_1(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Parcial 2</label>
              <input
                type="number"
                value={parcial_2}
                onChange={(e) => setParcial_2(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Parcial 3</label>
              <input
                type="number"
                value={parcial_3}
                onChange={(e) => setParcial_3(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Botón actualizar */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-2 rounded-md flex items-center gap-2 transition transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faSave} />
                Actualizar Calificación
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
