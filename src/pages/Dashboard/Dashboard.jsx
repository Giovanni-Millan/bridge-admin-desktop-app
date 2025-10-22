import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faComment, faIdBadge, faMagnifyingGlass, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../components/firebase';
import Swal from 'sweetalert2'

export default function Dashboard() {

  const [aviso, setAviso] = useState([]);
  const [correo, setCorreo] = useState("");
  const [user, setUser] = useState([]);

  // 🔹 Eliminar aviso con confirmación
  const handleDelete = async (id_aviso) => {
    Swal.fire({
      title: "¿Está seguro de eliminar este aviso?",
      text: "¡No podrá revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar aviso!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:4000/EliminarAviso/' + id_aviso);

          Swal.fire({
            title: "Aviso eliminado",
            text: "Tu aviso ha sido eliminado correctamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });

          setTimeout(() => {
            window.location.reload();
          }, 600);

        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el aviso.",
            icon: "error"
          });
        }
      }
    });
  };

  // 🔹 Mostrar detalles del aviso
  const handleViewAviso = (data) => {
    Swal.fire({
      title: `<strong>${data.titulo}</strong>`,
      html: `
        <p style="text-align:center justify;">${data.descripcion}</p>
        ${data.fecha ? `<p style="margin-top:10px; font-size: 13px; color: gray;">📅 ${data.fecha}</p>` : ''}
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#6b21a8",
      background: "#f9f7fd"
    });
  };

  const fetchUserData = () => {
    auth.onAuthStateChanged((user) => {
      setCorreo(user);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:4000/ConsultarAvisos')
      .then(res => setAviso(res.data))
      .catch(err => console.log(err));

    fetchUserData();
  }, []);

  async function handleLogOut() {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar titulo="Instituto Tecnológico Bridge" />

      {/* Encabezado */}
      <div className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
          Bienvenido {correo?.email}, ¿qué desea realizar?
        </h1>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span className="hidden md:inline">Cerrar sesión</span>
        </button>
      </div>

      {/* Botones principales */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-10">
        <Link
          to="/CrearAvisos"
          className="bg-purple-800 hover:bg-purple-900 text-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 transition-all transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faComment} className="text-6xl" />
          <label className="text-sm mt-5 font-light tracking-wide">Crear Avisos</label>
        </Link>

        <Link
          to="/InscribirAlumnos"
          className="bg-purple-800 hover:bg-purple-900 text-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 transition-all transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faIdBadge} className="text-6xl" />
          <label className="text-sm mt-5 font-light tracking-wide">Inscribir Alumnos</label>
        </Link>

        <Link
          to="/ConsultarGrupos"
          className="bg-purple-800 hover:bg-purple-900 text-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 transition-all transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-6xl" />
          <label className="text-sm mt-5 font-light tracking-wide">Consultar Grupos</label>
        </Link>

        <Link
          to="/ConsultarUsuarios"
          className="bg-purple-800 hover:bg-purple-900 text-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 transition-all transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faUsers} className="text-6xl" />
          <label className="text-sm mt-5 font-light tracking-wide">Consultar Usuarios</label>
        </Link>
      </section>

      {/* Sección de avisos */}
      <section className="mt-20 px-10 pb-10">
        <div className="bg-white shadow-lg border border-purple-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4 text-center">
            Avisos
          </h2>

          {/* Renderizado de avisos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aviso.map((data, i) => (
              <div
                key={i}
                onClick={() => handleViewAviso(data)}
                className="cursor-pointer border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all bg-purple-50 relative group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita abrir el modal al eliminar
                    handleDelete(data.id_aviso);
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white text-sm px-2 py-1 rounded-md flex items-center justify-center opacity-90 group-hover:opacity-100 transition"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <h3 className="text-sm font-semibold text-gray-800">{data.titulo}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-3">{data.descripcion}</p>
              </div>
            ))}
          </div>

          {aviso.length === 0 && (
            <p className="text-center text-gray-500 mt-4 text-sm">No hay avisos disponibles.</p>
          )}
        </div>
      </section>
    </main>
  );
}

