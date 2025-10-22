import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function CrearAvisos() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/CrearRutas', { titulo, descripcion })
      .then(res => {
        console.log(res);
        navigate('/Dashboard');
        Swal.fire({
        title: "Aviso Creado Con Exito!",
        text: "El aviso ha sido creado correctamente.",
        icon: "success"
      });
      }).catch(err => console.log(err));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar titulo="Crear Avisos" />

      {/* Botón volver */}
      <div className="mt-10 px-10">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 bg-purple-200 hover:bg-purple-400 text-purple-900 font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="hidden sm:inline">Regresar al panel</span>
        </Link>
      </div>

      {/* Formulario */}
      <div className="flex justify-center mt-16 px-4">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg border border-purple-200 p-8">
          <h1 className="text-2xl font-semibold text-purple-800 text-center mb-8">
            Crear un nuevo aviso
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo título */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Título:</label>
              <input
                type="text"
                className="w-full border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-md px-3 py-2 text-gray-700 outline-none transition-all"
                placeholder="Escribe el título del aviso"
                onChange={e => setTitulo(e.target.value)}
                required
              />
            </div>

            {/* Campo descripción */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Descripción:</label>
              <textarea
                className="w-full border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-md px-3 py-2 h-32 resize-none text-gray-700 outline-none transition-all"
                placeholder="Escribe los detalles del aviso"
                onChange={e => setDescripcion(e.target.value)}
                required
              />
            </div>

            {/* Botón enviar */}
            <div className="flex justify-center">
              <input
                type="submit"
                value="Crear Aviso"
                className="bg-purple-800 hover:bg-purple-900 text-white font-medium py-2 px-16 rounded-md shadow-sm transition-all cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
