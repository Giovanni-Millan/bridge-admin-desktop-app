import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilePdf, faFileExcel, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default function CalificacionesAlumno() {
  const { id } = useParams();
  const [alumno, setAlumno] = useState([]);
  const [infoAlumno, setInfoAlumno] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/ConsultarCalisPorAlumno/'+id)
      .then(res => setAlumno(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:4000/ConsultarInfoUsuarioId/'+id)
      .then(res => setInfoAlumno(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(85, 26, 139);
    doc.text(
      `Calificaciones de ${infoAlumno ? infoAlumno.nombre + ' ' + infoAlumno.apellido_paterno : ''}`,
      14,
      20
    );

    autoTable(doc, {
      startY: 30,
      head: [["Materia", "Parcial 1", "Parcial 2", "Parcial 3", "Promedio"]],
      body: alumno.map(a => [
        a.nombre_materia,
        a.parcial_1,
        a.parcial_2,
        a.parcial_3,
        ((a.parcial_1 + a.parcial_2 + a.parcial_3) / 3).toFixed(1)
      ]),
      styles: { fontSize: 8, textColor: [40, 40, 40], cellPadding: 3 },
      headStyles: {
        fillColor: [128, 90, 213],
        textColor: [255, 255, 255],
        halign: 'center',
        valign: 'middle'
      },
      alternateRowStyles: { fillColor: [243, 232, 255] }
    });

    doc.save(`calificaciones_${infoAlumno?.nombre || 'alumno'}.pdf`);
    Swal.fire({
      icon: 'success',
      title: '¡PDF guardado!',
      html: `Revisa tu carpeta de <b>Descargas</b>`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const exportExcel = () => {
    const worksheetData = alumno.map((a) => ({
      Materia: a.nombre_materia,
      "Parcial 1": a.parcial_1,
      "Parcial 2": a.parcial_2,
      "Parcial 3": a.parcial_3,
      Promedio: ((a.parcial_1 + a.parcial_2 + a.parcial_3) / 3).toFixed(1)
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Calificaciones");
    XLSX.writeFile(workbook, `calificaciones_${infoAlumno?.nombre || 'alumno'}.xlsx`);

    Swal.fire({
      icon: 'success',
      title: '¡Excel guardado!',
      html: `Revisa tu carpeta de <b>Descargas</b>`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar titulo="Calificaciones del Alumno" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-purple-200 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-300 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Volver
          </button>

          <div className="flex flex-wrap gap-3 justify-end">
            <Link
              to={`/SubirCalificacionesAlumno/${id}`}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              Registrar Calificaciones
            </Link>

            <button
              onClick={exportPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faFilePdf} />
              Exportar PDF
            </button>

            <button
              onClick={exportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faFileExcel} />
              Exportar Excel
            </button>
          </div>
        </div>

        {/* Nombre del alumno */}
        {infoAlumno ? (
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 text-center">
            {infoAlumno.nombre} {infoAlumno.apellido_paterno} {infoAlumno.apellido_materno}
          </h2>
        ) : (
          <p className="text-center text-gray-500 italic mb-4">Cargando información del alumno...</p>
        )}

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-purple-700 text-white text-sm select-none">
                <th className="text-left py-3 px-4">Materia</th>
                <th className="text-left py-3 px-4">Parcial 1</th>
                <th className="text-left py-3 px-4">Parcial 2</th>
                <th className="text-left py-3 px-4">Parcial 3</th>
                <th className="text-left py-3 px-4">Promedio</th>
                <th className="text-left py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {alumno.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No hay calificaciones disponibles.
                  </td>
                </tr>
              ) : (
                alumno.map((data, i) => (
                  <tr key={i} className="border-t text-sm hover:bg-purple-50 transition-colors duration-200">
                    <td className="py-3 px-4">{data.nombre_materia}</td>
                    <td className="py-3 px-4">{data.parcial_1}</td>
                    <td className="py-3 px-4">{data.parcial_2}</td>
                    <td className="py-3 px-4">{data.parcial_3}</td>
                    <td className="py-3 px-4 font-semibold text-purple-700">
                      {((data.parcial_1 + data.parcial_2 + data.parcial_3) / 3).toFixed(1)}
                    </td>
                    <td className='bg-blue-700 hover:bg-blue-950  font-semibold border-b-2 text-center'><Link to={'/ModificarCalificacion/'+data.id_calificacion}><FontAwesomeIcon icon={faPenToSquare} className='text-white' /></Link></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
