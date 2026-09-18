// =================================================================
// Archivo: src/pages/NuevoEquipoPage/NuevoEquipoPage.tsx
//RESPONSABILIDAD: Formulario para registrar un nuevo equipo en la API mediante POST.
// =================================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { equiposService } from '../../services/equiposervice';
import './NuevoEquipoPage.css';

export default function NuevoEquipoPage() {
  const [placaSena, setPlacaSena] = useState('');
  const [marcaModelo, setMarcaModelo] = useState('');
  const [ram, setRam] = useState('16GB DDR4');
  const [ambiente, setAmbiente] = useState('Ambiente 301 - ADSO');
  const [estado, setEstado] = useState<'Operativo' | 'En Mantenimiento'>('Operativo');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await equiposService.create({ placaSena, marcaModelo, ram, ambiente, estado });
      navigate('/inventario');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar equipo');
    }
  };
return (
  <section className="nuevo-equipo-page">

    <div className="nuevo-equipo-card">

      <div className="nuevo-equipo-header">
        <h2>Registrar Nuevo Equipo</h2>
        <p>Agrega un nuevo equipo al inventario tecnológico del SENA.</p>
      </div>

      {error && (
        <div className="nuevo-equipo-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="nuevo-equipo-form">

        <div className="form-group">
          <label>Placa SENA</label>
          <input
            type="text"
            required
            placeholder="SENA-1006"
            value={placaSena}
            onChange={(e) => setPlacaSena(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Marca / Modelo</label>
          <input
            type="text"
            required
            placeholder="Lenovo ThinkPad L14 G3"
            value={marcaModelo}
            onChange={(e) => setMarcaModelo(e.target.value)}
          />
        </div>

        <div className="form-row">

          <div className="form-group">
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

          <div className="form-group">
            <label>Estado Inicial</label>

            <select
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value as 'Operativo' | 'En Mantenimiento')
              }
            >
              <option value="Operativo">Operativo</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Ambiente Asignado</label>

          <input
            type="text"
            required
            value={ambiente}
            onChange={(e) => setAmbiente(e.target.value)}
          />
        </div>

        <div className="form-actions">

          <button
            type="button"
            onClick={() => navigate('/inventario')}
            className="btn-cancelar"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn-guardar"
          >
            Guardar Equipo
          </button>

        </div>

      </form>

    </div>

  </section>
);

}