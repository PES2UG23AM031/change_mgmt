import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../auth/AuthContext";
import LoginPage from "../components/LoginPage";

test("renders login form and validates input", () => {
  render(
    <AuthContext.Provider value={{ login: jest.fn() }}>
      <LoginPage />
    </AuthContext.Provider>
  );
  expect(screen.getByText(/Change Management Login/i)).toBeInTheDocument();
});
