// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../auth/AuthContext";
import "../css/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil al navegar
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="nav-inner">
        {/* Logo / nombre app */}
        <Link to="/" className="brand" onClick={close}>
          Task Manager
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="menu-btn"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Links escritorio */}
        <ul className="nav-links">
          {user ? (
            <>
              <li className="welcome">Hola, {user.username}</li>
              <li>
                <button className="btn-ghost" onClick={logout}>
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/register">Registro</Link>
              </li>
            </>
          )}
        </ul>

        {/* Menú móvil */}
        <ul className={`mobile-menu ${open ? "show" : ""}`}>
          {user ? (
            <>
              <li className="welcome">Hola, {user.username}</li>
              <li>
                <button className="btn-ghost" onClick={logout}>
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={close}>
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={close}>
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
