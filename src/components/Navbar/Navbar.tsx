import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav-menu">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}>
        📊 Dashboard
      </NavLink>
      <NavLink 
        to="/inventario" 
        className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}>
        💻 Inventario (5)
      </NavLink>
      <NavLink 
        to="/prestamos" 
        className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}>
        📋 Préstamos (3)
      </NavLink>
      <NavLink 
        to="/ticketera" 
        className={({ isActive }) => isActive ? 'nav-pill active' : 'nav-pill'}>
        🛠️ Ticketera (2)
      </NavLink>
    </nav>
  );
}