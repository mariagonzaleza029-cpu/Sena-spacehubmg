import './DashboardPage.css';
function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-badge">Panel principal</span>
          <h1>Dashboard</h1>
          <p>
            Bienvenido al sistema de gestión de recursos tecnológicos del SENA.
          </p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">💻</div>
          <div>
            <span className="card-label">Equipos registrados</span>
            <strong>5</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">✅</div>
          <div>
            <span className="card-label">Equipos operativos</span>
            <strong>4</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🔧</div>
          <div>
            <span className="card-label">En mantenimiento</span>
            <strong>1</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🏫</div>
          <div>
            <span className="card-label">Ambientes</span>
            <strong>4</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h2>Resumen del sistema</h2>
          <span>Estado actual</span>
        </div>

        <div className="dashboard-summary">
          <div className="summary-item">
            <span className="summary-dot active"></span>
            <div>
              <strong>Inventario</strong>
              <p>Gestión de equipos tecnológicos</p>
            </div>
            <span className="summary-status">Disponible</span>
          </div>

          <div className="summary-item">
            <span className="summary-dot active"></span>
            <div>
              <strong>Autenticación</strong>
              <p>Acceso protegido mediante JWT</p>
            </div>
            <span className="summary-status">Activo</span>
          </div>

          <div className="summary-item">
            <span className="summary-dot active"></span>
            <div>
              <strong>API REST</strong>
              <p>Comunicación con el servidor</p>
            </div>
            <span className="summary-status">Conectada</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

