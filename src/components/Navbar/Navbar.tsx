
// =================================================================
// Archivo: src/components/Navbar/Navbar.tsx
// RESPONSABILIDAD: Barra de navegación superior con enlaces a los
// módulos principales.
// =================================================================

import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function NavBar() {
  const location = useLocation();

  return (
    <header className="nav-menu">

      <Link
        to="/dashboard"
        className={`nav-pill ${
          location.pathname === '/dashboard' ? 'active' : ''
        }`}
      >
        Dashboard
      </Link>

      <Link
        to="/inventario"
        className={`nav-pill ${
          location.pathname.startsWith('/inventario') ? 'active' : ''
        }`}
      >
        Inventario Equipos
      </Link>

    </header>
  );
}
