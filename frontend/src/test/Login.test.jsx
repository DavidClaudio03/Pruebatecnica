import { render, screen, fireEvent } from "@testing-library/react";
import { test, vi, expect } from "vitest";
import Login from "../pages/Login";
import { AuthContext } from "../auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("renderiza formulario de login y responde al submit", async () => {
  const mockLogin = vi.fn(() => Promise.resolve());

  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/usuario/i), {
    target: { value: "ana" },
  });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: "12345678" },
  });

  await fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(mockLogin).toHaveBeenCalledWith({
    username: "ana",
    password: "12345678",
  });
});
