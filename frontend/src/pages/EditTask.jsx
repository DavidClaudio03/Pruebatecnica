import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams(); // id de la URL /tasks/:id
  const nav = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  // Cargar datos al montar
  useEffect(() => {
    api
      .get(`/tasks/${id}/`)
      .then((res) => setTask(res.data))
      .catch(() => setError("No se encontró la tarea."));
  }, [id]);

  async function handleUpdate(data) {
    try {
      await api.put(`/tasks/${id}/`, { ...task, ...data });
      nav("/"); // vuelve al listado
    } catch {
      setError("Error al actualizar la tarea.");
    }
  }

  if (error) return <p>{error}</p>;
  if (!task) return <p>Cargando...</p>;

  return (
    <>
      <h2>Editar tarea</h2>
      <TaskForm initial={task} onSubmit={handleUpdate} />
    </>
  );
}
