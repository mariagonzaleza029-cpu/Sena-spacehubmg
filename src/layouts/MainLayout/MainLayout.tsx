
// =================================================================
// Archivo: src/layouts/MainLayout/MainLayout.tsx
// RESPONSABILIDAD: Layout principal que integra SenaHeader,
// NavBar y el contenido de las rutas hijas.
// =================================================================

import { Outlet } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';
import Header from '../../components/SenaHeader/SenaHeader';
import './MainLayout.css';

export default function MainLayout() {

  return (
    <div className="layout-shell">

      {/* Encabezado principal */}
      <Header />

      {/* Barra de navegación */}
      <NavBar />

      {/* Contenido de las páginas */}
      <main className="content-viewport">
        <Outlet />
      </main>

    </div>
  );
}
