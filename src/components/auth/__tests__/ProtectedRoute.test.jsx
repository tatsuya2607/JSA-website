import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

let onAuthStateChangedCallback;

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    onAuthStateChangedCallback = callback;
    return vi.fn();
  }),
}));

vi.mock("../../../firebase/firebase", () => ({
  auth: "MOCK_AUTH",
}));

import ProtectedRoute from "../ProtectedRoute";

beforeEach(() => {
  vi.clearAllMocks();
  onAuthStateChangedCallback = null;
});

function renderWithRoute(initialPath = "/protected") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/admin-login" element={<div>login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  it("shows 'Checking authentication status...' initially", () => {
    renderWithRoute();
    expect(screen.getByText(/Checking authentication status/)).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    renderWithRoute();
    onAuthStateChangedCallback({ email: "admin@example.com" });
    expect(screen.getByText("protected content")).toBeInTheDocument();
  });

  it("redirects to admin-login when user is null", () => {
    renderWithRoute();
    onAuthStateChangedCallback(null);
    expect(screen.getByText("login page")).toBeInTheDocument();
  });
});
