// src/pages/Tasks.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get("/tasks/").then((res) => setTasks(res.data));
  }, []);

  function refresh() {
    api.get("/tasks/").then((res) => setTasks(res.data));
  }

  function handleCreate(data) {
    api.post("/tasks/", data).then(refresh);
  }

  function toggle(task) {
    api
      .patch(`/tasks/${task.id}/`, { completed: !task.completed })
      .then(refresh);
  }

  function remove(id) {
    api.delete(`/tasks/${id}/`).then(refresh);
  }

  return (
    <>
      <TaskForm onSubmit={handleCreate} />
      <ul>
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={toggle}
            onDelete={remove}
            onEdit={() => nav(`/tasks/${t.id}`)}
          />
        ))}
      </ul>
    </>
  );
}
