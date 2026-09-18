// =================================================================
// Archivo: src/pages/DetalleEquipoPage/DetalleEquipoPage.tsx
//RESPONSABILIDAD: Formulario para consultar y actualizar un equipo existente mediante PUT.
// =================================================================
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equiposService } from '../../services/equiposervice';
import type { Equipo } from '../../services/equiposervice';
import './DetalleEquipoPage.css';

export default function DetalleEquipoPage() {
  const { placaSena } = useParams<{ placaSena: string }>();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [ram, setRam] = useState('16GB DDR4');
  const [ambiente, setAmbiente] = useState('');
  const [estado, setEstado] = useState<'Operativo' | 'En Mantenimiento'>('Operativo');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    equiposService.getAll()
      .then((data) => {
        const found = data.find((e) => e.placaSena.toUpperCase() === placaSena?.toUpperCase());
        if (found) {
          setEquipo(found);
          setRam(found.ram);
          setAmbiente(found.ambiente);
          setEstado(found.estado);
        }
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error al cargar'));
  }, [placaSena]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await equiposService.update(placaSena!, { ram, ambiente, estado });
      navigate('/inventario');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  if (!equipo && !error) return <div className="p-6 text-white text-center font-mono text-xs">Cargando recurso...</div>;

return (
  <section className="detalle-equipo-page">

    <div className="detalle-equipo-card">

      <div className="detalle-equipo-header">
        <h2>Editar Equipo</h2>

        <p>
          Placa SENA:{' '}
          <span className="placa-detalle">
            {placaSena}
          </span>
        </p>
      </div>

      {error && (
        <div className="detalle-equipo-error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleUpdate}
        className="detalle-equipo-form"
      >

        <div className="info-equipo">
          <span>Marca / Modelo</span>

          <span>
            {equipo?.marcaModelo}
          </span>
        </div>

        <div className="detalle-form-group">
          <label>Memoria RAM</label>

          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
          >
            <option value="8GB DDR4">8GB DDR4</option>
            <option value="16GB DDR4">16GB DDR4</option>
            <option value="32GB DDR5">32GB DDR5</option>
          </select>
        </div>

        <div className="detalle-form-group">
          <label>Estado Técnico</label>

          <select
            value={estado}
            onChange={(e) =>
              setEstado(
                e.target.value as 'Operativo' | 'En Mantenimiento'
              )
            }
          >
            <option value="Operativo">
              Operativo
            </option>

            <option value="En Mantenimiento">
              En Mantenimiento
            </option>
          </select>
        </div>

        <div className="detalle-form-group">
          <label>Ambiente Asignado</label>

          <input
            type="text"
            value={ambiente}
            onChange={(e) => setAmbiente(e.target.value)}
          />
        </div>

        <div className="detalle-form-actions">

          <button
            type="button"
            onClick={() => navigate('/inventario')}
            className="btn-volver"
          >
            Volver
          </button>

          <button
            type="submit"
            className="btn-actualizar"
          >
            Actualizar Equipo
          </button>

        </div>

      </form>

    </div>

  </section>
);
}