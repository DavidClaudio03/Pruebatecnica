import { render, screen, fireEvent } from "@testing-library/react";
import { test, vi, expect } from "vitest";
import TaskItem from "../components/TaskItem";

test("renderiza tarea con título y permite marcar como completada", () => {
  const task = { id: 1, title: "Estudiar", completed: false };
  const onToggle = vi.fn();
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  render(
    <TaskItem
      task={task}
      onToggle={onToggle}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

  // Verifica render
  expect(screen.getByText(/estudiar/i)).toBeInTheDocument();

  // Click en checkbox
  fireEvent.click(screen.getByRole("checkbox"));
  expect(onToggle).toHaveBeenCalledWith(task);

  // Click en editar
  fireEvent.click(screen.getByText(/editar/i));
  expect(onEdit).toHaveBeenCalledWith(task);

  // Click en borrar
  fireEvent.click(screen.getByText(/borrar/i));
  expect(onDelete).toHaveBeenCalledWith(task.id);
});
