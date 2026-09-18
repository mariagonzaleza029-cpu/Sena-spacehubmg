// =================================================================
// Archivo: src/pages/EquiposPage/EquiposPage.tsx
//RESPONSABILIDAD: Muestra la tabla con el listado de equipos y permite eliminar recursos.
// =================================================================
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { equiposService } from '../../services/equiposervice';
import type { Equipo } from '../../services/equiposervice';
import { useAuth } from '../../Context/AuthContext';
import './EquiposPage.css';

export default function EquiposPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  const loadEquipos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEquipos(); }, []);

  const handleDelete = async (placaSena: string) => {
    if (!window.confirm(`¿Eliminar el equipo ${placaSena}?`)) return;
    try {
      await equiposService.remove(placaSena);
      loadEquipos();
    } catch (err: unknown) {
      alert(`Error API: ${err instanceof Error ? err.message : 'Error al eliminar'}`);
    }
  };

return (
  <section className="equipos-page">

    <div className="equipos-header">
      <div>
        <h2>Inventario de Equipos SENA</h2>
        <p>Gestión y consulta de los equipos tecnológicos registrados.</p>
      </div>

      {isAdmin && (
        <Link to="/inventario/nuevo" className="btn-registrar">
          + Registrar Equipo
        </Link>
      )}
    </div>

    {error && (
      <div className="equipos-error">
        {error}
      </div>
    )}

    {loading ? (
      <div className="equipos-loading">
        Cargando inventario...
      </div>
    ) : (
      <div className="equipos-table-container">
        <table className="equipos-table">
          <thead>
            <tr>
              <th>Placa SENA</th>
              <th>Marca / Modelo</th>
              <th>RAM</th>
              <th>Ambiente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {equipos.map((eq) => (
              <tr key={eq.placaSena}>

                <td className="placa-sena">
                  {eq.placaSena}
                </td>

                <td>
                  {eq.marcaModelo}
                </td>

                <td>
                  {eq.ram}
                </td>

                <td>
                  {eq.ambiente}
                </td>

                <td>
                  <span
                    className={`estado ${
                      eq.estado === 'Operativo'
                        ? 'estado-operativo'
                        : 'estado-mantenimiento'
                    }`}
                  >
                    {eq.estado}
                  </span>
                </td>

                <td className="acciones">
                  <Link
                    to={`/inventario/${eq.placaSena}`}
                    className="btn-editar"
                  >
                    Editar
                  </Link>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(eq.placaSena)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

  </section>
);

}