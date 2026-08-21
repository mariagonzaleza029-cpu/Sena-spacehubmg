import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/SenaHeader/SenaHeader';

export default function MainLayout() {
  return (
    <div className="layout-shell">

      {/* Header de SENA SpaceHub */}
      <Header />

      {/* Barra de navegación */}
      <Navbar />

      <main className="content-viewport">
        {/* Aquí React Router inyecta la página correspondiente */}
        <Outlet />
      </main>

    </div>
  );
}