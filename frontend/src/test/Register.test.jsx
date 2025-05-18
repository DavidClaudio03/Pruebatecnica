import { render, screen, fireEvent } from "@testing-library/react";
import { test, vi, expect } from "vitest";
import { AuthContext } from "../auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";

test("renderiza y envía el formulario de registro", async () => {
  const mockRegister = vi.fn(() => Promise.resolve());

  render(
    <AuthContext.Provider value={{ register: mockRegister }}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
    target: { value: "nuevo" },
  });

  fireEvent.change(screen.getAllByPlaceholderText(/contraseña/i)[0], {
    target: { value: "12345678" },
  });

  fireEvent.change(screen.getByPlaceholderText(/confirmar contraseña/i), {
    target: { value: "12345678" },
  });

  fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

  expect(mockRegister).toHaveBeenCalledWith({
    username: "nuevo",
    password: "12345678",
  });
});
