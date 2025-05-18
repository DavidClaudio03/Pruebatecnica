"use client";

import { useState } from "react";
import "../css/TaskForm.css";

export default function TaskForm({ onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [error, setError] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <div className="task-form-container">
      <form onSubmit={handleSend} className="task-form">
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="input-focus-effect"></span>
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="input-focus-effect"></span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          <span className="button-text">Guardar</span>
          <span className="button-icon">+</span>
        </button>
      </form>
    </div>
  );
}
