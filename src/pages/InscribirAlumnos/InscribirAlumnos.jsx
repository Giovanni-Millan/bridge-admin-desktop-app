import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function InscribirAlumnos() {
  const navigate = useNavigate();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    curp: "",
    correo: "",
    contraseña: "",
    telefono: "",
    direccion: "",
    cuatrimestre: "",
    carrera: "", // el valor del select se guarda aquí
  });

  // Opciones de carreras (puedes agregar más si lo deseas)
  const carreras = [
    "Ingenieria En Sistemas Computacionales",
    "Derecho",
    "Administración",
    "Psicologia",
    "Pedagogia",
    
  ];

  // Manejar cambios en inputs y select
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/InscribirAlumnos", formData);

      Swal.fire({
        title: "Alumno inscrito exitosamente 🎉",
        text: `El alumno ${formData.nombre} ha sido registrado correctamente.`,
        icon: "success",
        confirmButtonText: "Volver al dashboard",
        confirmButtonColor: "#6D28D9",
      }).then(() => {
        navigate("/Dashboard");
      });

      console.log("Alumno registrado:", res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error al registrar",
        text: "Ocurrió un problema al guardar el alumno. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <Navbar titulo="Inscribir Alumnos" />

      {/* Botón volver */}
      <div className="mt-8 px-10">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 bg-purple-200 hover:bg-purple-400 text-purple-900 font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="hidden sm:inline">Regresar al panel</span>
        </Link>
      </div>

      {/* Formulario */}
      <div className="flex justify-center mt-12 px-4">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg border border-purple-200 p-8 mb-10">
          <h1 className="text-3xl font-semibold text-purple-800 text-center mb-8">
            Formulario de Inscripción
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre y apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="apellido_paterno"
                placeholder="Apellido paterno"
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="apellido_materno"
                placeholder="Apellido materno"
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Fecha y CURP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="fecha_nacimiento"
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="curp"
                placeholder="CURP"
                onChange={handleChange}
                required
                className="input uppercase"
                maxLength="18"
              />
            </div>

            {/* Correo y contraseña */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Teléfono y cuatrimestre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="number"
                name="cuatrimestre"
                placeholder="Cuatrimestre"
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Dirección y carrera (select) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                onChange={handleChange}
                required
                className="input"
              />

              {/* Select de carrera */}
              <select
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                required
                className="input bg-white border-gray-300"
              >
                <option value="">Selecciona una carrera</option>
                {carreras.map((carrera, index) => (
                  <option key={index} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón enviar */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-900 text-white font-medium py-2 px-10 rounded-md shadow-md transition-all"
              >
                Inscribir Alumno
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
