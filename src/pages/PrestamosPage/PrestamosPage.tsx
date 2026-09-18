import { useEffect, useState } from 'react';
import { prestamosService, type Prestamo } from '../../services/PrestamosService';
import { equiposService, type Equipo } from '../../services/equiposervice';
import { useAuth } from '../../Context/AuthContext';
import PrestamoModal from '../../components/PrestamoModal/PrestamoModal';
import Swal from 'sweetalert2';
import './PrestamoPage.css';

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAdmin, user } = useAuth();

  const loadPrestamos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [prestamosData, equiposData] = await Promise.all([
        prestamosService.getAll(),
        equiposService.getAll()
      ]);

      setPrestamos(prestamosData);
      setEquipos(equiposData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrestamos();
  }, []);

  const handleCrearPrestamo = async (data: {
    aprendiz: string;
    ficha: string;
    equipoPlaca: string;
  }) => {
    try {
      await prestamosService.create(data);
      loadPrestamos();

      Swal.fire({
        title: '¡Registrado!',
        text: 'El préstamo se ha creado exitosamente.',
        icon: 'success',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#39A900'
      });
    } catch (err: unknown) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar el préstamo',
        icon: 'error',
        background: '#1e293b',
        color: '#fff'
      });
    }
  };

  const handleDevolver = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Confirmar Devolución?',
      text: 'El equipo quedará nuevamente disponible en el inventario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#39A900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar devolución',
      cancelButtonText: 'Cancelar',
      background: '#1e293b',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await prestamosService.devolver(id);
        loadPrestamos();

        Swal.fire({
          title: '¡Devuelto!',
          text: 'El equipo ha sido devuelto exitosamente.',
          icon: 'success',
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#39A900'
        });
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo procesar la devolución',
          icon: 'error',
          background: '#1e293b',
          color: '#fff'
        });
      }
    }
  };

  return (
    <section className="prestamos-page">

      {/* ENCABEZADO */}
      <div className="prestamos-header">
        <div>
          <span className="prestamos-badge">
            Gestión académica
          </span>

          <h2>Gestión de Préstamos</h2>

          <p>
            Control de asignación y devoluciones de equipos de cómputo.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-nuevo-prestamo"
        >
          + Nuevo Préstamo
        </button>
      </div>

      {/* HISTORIAL */}
      <div className="prestamos-section">

        <div className="prestamos-section-header">
          <h2>Historial de Préstamos Activos</h2>
          <p>
            Consulta las asignaciones realizadas a los aprendices.
          </p>
        </div>

        {error && (
          <div className="prestamos-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="prestamos-loading">
            Conectando con el servidor...
          </div>
        ) : (
          <div className="prestamos-table-container">

            <table className="prestamos-table">

              <thead>
                <tr>
                  <th>Aprendiz / Ficha</th>
                  <th>Equipo (Placa)</th>
                  <th>Hora salida</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {prestamos.map((p) => (
                  <tr key={p.id}>

                    <td>
                      <span className="aprendiz-nombre">
                        {p.aprendiz}
                      </span>

                      <span className="aprendiz-ficha">
                        Ficha: {p.ficha}
                      </span>
                    </td>

                    <td className="equipo-placa">
                      {p.equipoPlaca}
                    </td>

                    <td className="hora-prestamo">
                      {p.horaInicio}
                    </td>

                    <td>
                      <span
                        className={`prestamo-estado ${
                          p.estado === 'Activo'
                            ? 'estado-activo'
                            : 'estado-devuelto'
                        }`}
                      >
                        {p.estado}
                      </span>
                    </td>

                    <td className="prestamo-acciones">
                      {p.estado === 'Activo' && isAdmin && (
                        <button
                          onClick={() => handleDevolver(p.id)}
                          className="btn-devolver"
                        >
                          Devolver
                        </button>
                      )}
                    </td>

                  </tr>
                ))}

                {prestamos.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="prestamos-empty"
                    >
                      No hay préstamos registrados.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>

      <PrestamoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCrearPrestamo}
        isAdmin={isAdmin}
        defaultNombre={user?.nombreCompleto || ''}
        defaultFicha={user?.ficha || ''}
        equipos={equipos}
      />

    </section>
  );
}