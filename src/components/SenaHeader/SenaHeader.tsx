
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './SenaHeader.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">

      <div className="header-brand">
        <span className="brand-name">
          SENA SpaceHub
        </span>

        <span className="brand-description">
          Gestión de recursos tecnológicos
        </span>
      </div>

      {user && (
        <div className="user-container">

          <span className="status"></span>

          <span className="user-name">
            {user.nombreCompleto}
          </span>

          <span className="user-role">
            {user.role}
          </span>

          <button
            className="btn-logout"
            onClick={handleLogout}
          >
            Salir
          </button>

        </div>
      )}

    </header>
  );
}

export default Header;
