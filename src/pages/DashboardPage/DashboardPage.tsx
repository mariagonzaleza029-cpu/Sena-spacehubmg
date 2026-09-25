import { useEffect, useState } from 'react';
import './DashboardPage.css';
import {
  getDashboardStats,
  type DashboardStats,
} from '../../services/dashboardService';

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error al cargar estadísticas:', err);
        setError('No se pudieron cargar las estadísticas.');
      } finally {
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, []);

  if (loading) {
    return (
      <section className="dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <h2>Cargando panel</h2>
          <p>Consultando información del sistema...</p>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="dashboard">
        <div className="dashboard-error">
          <span>⚠️</span>
          <h2>No fue posible cargar el Dashboard</h2>
          <p>{error || 'No hay información disponible.'}</p>
        </div>
      </section>
    );
  }

  /*
   * Cálculos para el radar de inventario
   */
  const radio = 76;
  const circunferencia = 2 * Math.PI * radio;

  const porcentaje = Math.min(
    Math.max(stats.porcentajeOperativos, 0),
    100
  );

  const desplazamiento =
    circunferencia - (porcentaje / 100) * circunferencia;

  return (
    <section className="dashboard">

      {/* =====================================================
          ENCABEZADO
      ====================================================== */}

      <div className="dashboard-top">
        <div>
          <span className="dashboard-badge">
            ● PANEL PRINCIPAL
          </span>

          <h1>
            Centro de <span>Control</span>
          </h1>

          <p>
            Monitorea el estado de los recursos tecnológicos del SENA
            desde un solo lugar.
          </p>
        </div>

        <div className="system-status">
          <span className="status-pulse"></span>

          <div>
            <strong>Sistema operativo</strong>
            <small>Información actualizada</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          ESTADÍSTICAS PRINCIPALES
      ====================================================== */}

      <div className="dashboard-main-grid">

        {/* Inventario total */}

        <div className="main-stat-card">

          <div className="main-stat-header">
            <span className="main-stat-label">
              INVENTARIO TOTAL
            </span>

            <span className="main-stat-icon">
              💻
            </span>
          </div>

          <div className="main-stat-number">
            {stats.totalEquipos}
          </div>

          <p>
            equipos registrados actualmente
          </p>

          <div className="main-stat-footer">
            <span>
              ● Inventario activo
            </span>

            <span>
              100%
            </span>
          </div>

        </div>

        {/* Estado del inventario */}

        <div className="inventory-card">

          <div className="card-heading">

            <div>
              <span className="section-kicker">
                MONITOREO
              </span>

              <h2>
                Estado del inventario
              </h2>
            </div>

            <span className="live-indicator">
              LIVE
            </span>

          </div>

          {/* Operativos */}

          <div className="progress-block">

            <div className="progress-info">

              <span>
                <i className="legend-dot operational"></i>
                Equipos operativos
              </span>

              <strong>
                {stats.porcentajeOperativos}%
              </strong>

            </div>

            <div className="progress-track">

              <div
                className="progress-fill operational-fill"
                style={{
                  width: `${stats.porcentajeOperativos}%`,
                }}
              ></div>

            </div>

            <small>
              {stats.equiposOperativos} de {stats.totalEquipos} equipos
            </small>

          </div>

          {/* Mantenimiento */}

          <div className="progress-block">

            <div className="progress-info">

              <span>
                <i className="legend-dot maintenance"></i>
                En mantenimiento
              </span>

              <strong>
                {stats.porcentajeMantenimiento}%
              </strong>

            </div>

            <div className="progress-track">

              <div
                className="progress-fill maintenance-fill"
                style={{
                  width: `${stats.porcentajeMantenimiento}%`,
                }}
              ></div>

            </div>

            <small>
              {stats.equiposMantenimiento} de {stats.totalEquipos} equipos
            </small>

          </div>

        </div>
      </div>

      {/* =====================================================
          ESTADÍSTICAS RÁPIDAS
      ====================================================== */}

      <div className="quick-stats">

        <div className="quick-card">

          <div className="quick-icon">
            ✅
          </div>

          <div>
            <span>OPERATIVOS</span>
            <strong>
              {stats.equiposOperativos}
            </strong>
          </div>

          <div className="quick-arrow">
            ↗
          </div>

        </div>

        <div className="quick-card">

          <div className="quick-icon maintenance-icon">
            🔧
          </div>

          <div>
            <span>MANTENIMIENTO</span>
            <strong>
              {stats.equiposMantenimiento}
            </strong>
          </div>

          <div className="quick-arrow">
            ↗
          </div>

        </div>

        <div className="quick-card">

          <div className="quick-icon">
            🏫
          </div>

          <div>
            <span>AMBIENTES</span>
            <strong>
              {stats.ambientes}
            </strong>
          </div>

          <div className="quick-arrow">
            ↗
          </div>

        </div>

      </div>

      {/* =====================================================
          RADAR DE INVENTARIO
      ====================================================== */}

      <div className="inventory-radar">

        {/* Encabezado */}

        <div className="radar-header">

          <div>
            <span className="section-kicker">
              ANÁLISIS
            </span>

            <h2>
              Radar de inventario
            </h2>

            <p>
              Distribución actual de los equipos y ambientes registrados.
            </p>
          </div>

          <div className="radar-live">
            <span></span>
            DATOS EN VIVO
          </div>

        </div>

        {/* Contenido */}

        <div className="radar-content">

          {/* =================================================
              CÍRCULO
          ================================================== */}

          <div className="radar-circle-section">

            <div className="radar-circle">

              <svg
                className="radar-svg"
                viewBox="0 0 180 180"
              >

                {/* Fondo */}

                <circle
                  cx="90"
                  cy="90"
                  r={radio}
                  className="radar-circle-bg"
                />

                {/* Progreso */}

                <circle
                  cx="90"
                  cy="90"
                  r={radio}
                  className="radar-circle-progress"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={desplazamiento}
                />

              </svg>

              <div className="radar-circle-center">

                <strong>
                  {stats.porcentajeOperativos}%
                </strong>

                <span>
                  operativos
                </span>

              </div>

            </div>

            <div className="radar-summary">

              <div className="radar-summary-item">
                <span className="radar-dot operational"></span>

                <div>
                  <strong>
                    {stats.equiposOperativos}
                  </strong>

                  <small>
                    Operativos
                  </small>
                </div>
              </div>

              <div className="radar-summary-item">
                <span className="radar-dot maintenance"></span>

                <div>
                  <strong>
                    {stats.equiposMantenimiento}
                  </strong>

                  <small>
                    Mantenimiento
                  </small>
                </div>
              </div>

            </div>

          </div>

          {/* =================================================
              AMBIENTES
          ================================================== */}

          <div className="ambientes-section">

            <div className="ambientes-heading">

              <div>
                <span>
                  DISTRIBUCIÓN
                </span>

                <h3>
                  Ambientes activos
                </h3>
              </div>

              <strong>
                {stats.ambientes}
              </strong>

            </div>

            <div className="ambientes-list">

              {(stats.ambientesDetalle || []).map(
                (ambiente, index) => {

                  const porcentajeAmbiente =
                    stats.totalEquipos > 0
                      ? Math.round(
                          (ambiente.cantidad /
                            stats.totalEquipos) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      className="ambiente-item"
                      key={ambiente.nombre}
                    >

                      <div className="ambiente-number">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="ambiente-info">

                        <div className="ambiente-title">

                          <strong>
                            {ambiente.nombre}
                          </strong>

                          <span>
                            {ambiente.cantidad}{' '}
                            {ambiente.cantidad === 1
                              ? 'equipo'
                              : 'equipos'}
                          </span>

                        </div>

                        <div className="ambiente-progress">

                          <div
                            style={{
                              width: `${porcentajeAmbiente}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                      <div className="ambiente-percentage">
                        {porcentajeAmbiente}%
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SERVICIOS DEL SISTEMA
      ====================================================== */}

      <div className="system-panel">

        <div className="system-panel-header">

          <div>

            <span className="section-kicker">
              ESTADO GENERAL
            </span>

            <h2>
              Servicios del sistema
            </h2>

          </div>

          <span className="system-check">
            ✓ Todos los servicios disponibles
          </span>

        </div>

        <div className="services-grid">

          <div className="service-item">

            <div className="service-icon">
              📦
            </div>

            <div className="service-info">

              <strong>
                Inventario
              </strong>

              <span>
                Gestión de equipos tecnológicos
              </span>

            </div>

            <div className="service-status">
              <span></span>
              Disponible
            </div>

          </div>

          <div className="service-item">

            <div className="service-icon">
              🔐
            </div>

            <div className="service-info">

              <strong>
                Autenticación
              </strong>

              <span>
                Acceso protegido mediante JWT
              </span>

            </div>

            <div className="service-status">
              <span></span>
              Activo
            </div>

          </div>

          <div className="service-item">

            <div className="service-icon">
              ⚡
            </div>

            <div className="service-info">

              <strong>
                API REST
              </strong>

              <span>
                Comunicación con el servidor
              </span>

            </div>

            <div className="service-status">
              <span></span>
              Conectada
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;