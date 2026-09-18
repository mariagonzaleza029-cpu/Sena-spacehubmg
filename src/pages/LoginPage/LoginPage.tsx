
// =================================================================
// Archivo: src/pages/LoginPage/LoginPage.tsx
// RESPONSABILIDAD: Renderiza el formulario de inicio de sesión y consume el authService.login.
// =================================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">S</div>

          <div>
            <h1>SENA SpaceHub</h1>
            <p>Gestión de recursos tecnológicos</p>
          </div>
        </div>

        <div className="login-heading">
          <h2>Iniciar sesión</h2>
          <p>
            Ingresa con tu correo institucional para acceder al sistema.
          </p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="loginEmail">
              Correo institucional
            </label>

            <input
              id="loginEmail"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="roberto.gomez@sena.edu.co"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">
              Contraseña
            </label>

            <input
              id="loginPassword"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Autenticando...' : 'Ingresar al sistema'}
          </button>

        </form>

        <div className="login-footer">
          <span>🔐</span>
          <span>Acceso protegido mediante JWT</span>
        </div>

      </div>
    </main>
  );
}
