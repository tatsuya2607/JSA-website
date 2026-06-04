import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock("../../firebase/firebase", () => ({
  auth: "MOCK_AUTH",
}));

import { signInWithEmailAndPassword } from "firebase/auth";
import AdminLogin from "../AdminLogin";

beforeEach(() => {
  vi.clearAllMocks();
});

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/admin-login"]}>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<div>admin dashboard</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AdminLogin", () => {
  it("renders email and password fields", () => {
    renderLogin();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("submits with trimmed email", async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByLabelText("Email"), "  admin@x.com  ");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Log In" }));
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      "MOCK_AUTH",
      "admin@x.com",
      "secret"
    );
  });

  it("redirects to /admin after successful login", async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByLabelText("Email"), "admin@x.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Log In" }));
    await waitFor(() => {
      expect(screen.getByText("admin dashboard")).toBeInTheDocument();
    });
  });

  it("shows error message on failed login", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error("bad password"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByLabelText("Email"), "admin@x.com");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Log In" }));
    await waitFor(() => {
      expect(
        screen.getByText(/Login failed/)
      ).toBeInTheDocument();
    });
    consoleErrorSpy.mockRestore();
  });

  it("disables submit button while submitting", async () => {
    signInWithEmailAndPassword.mockReturnValueOnce(new Promise(() => {}));
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByLabelText("Email"), "admin@x.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Log In" }));
    expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled();
  });
});
