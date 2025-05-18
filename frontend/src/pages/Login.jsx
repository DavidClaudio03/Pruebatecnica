// src/pages/Login.jsx  (o .tsx si usas TS)
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "../css/Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch {
      setError("Credenciales incorrectas");
    }
  }

  return (
    <div className="login-container px-4">
      <div className="login-card">
        <header className="login-header">
          <h2 className="login-title">Iniciar Sesión</h2>
          <span className="login-decoration" />
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-box">
            <input
              name="username"
              value={form.username}
              placeholder="Usuario"
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Contraseña"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
