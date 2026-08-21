import './SenaHeader.css';

interface Usuario {
  nombre: string;
  rol: string;
}

interface HeaderProps {
  usuario?: Usuario;
}

function Header({ usuario }: HeaderProps) {
  return (
    <header className="header">

      <div className="header-brand">
        <span className="brand-name">
          SENA SpaceHub
        </span>

      </div>

      {usuario ? (
        <div className="user-container">

          <span className="status"></span>

          <span className="user-name">
            {usuario.nombre}
          </span>

          <span className="user-role">
            {usuario.rol}
          </span>

          <button className="btn-logout">
            Salir
          </button>

        </div>
      ) : (
        <div className="auth-buttons">

          <button className="btn-login">
             Iniciar Sesión
          </button>

          <button className="btn-register">
             Registrarse
          </button>

        </div>
      )}

    </header>
  );
}

export default Header;

