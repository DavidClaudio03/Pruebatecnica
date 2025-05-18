// src/pages/Register.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "../css/Register.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      await register({ username: form.username, password: form.password });
      nav("/");
    } catch {
      setError("El nombre de usuario ya existe o hay un error en el servidor");
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="register-container">
      <div className="register-card">
        <header className="register-header">
          <h2 className="register-title">Crear cuenta</h2>
          <span className="register-decoration" />
        </header>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-box">
            <input
              name="username"
              value={form.username}
              placeholder="Usuario"
              onChange={handleChange}
              required
            />
            <div className="input-highlight" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
            <div className="input-highlight" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              required
            />
            <div className="input-highlight" />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="register-button">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
