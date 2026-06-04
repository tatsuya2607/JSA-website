import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboardCard from "../AdminDashboardCard";

function MockIcon(props) {
  return <svg data-testid="card-icon" {...props} />;
}

function renderCard(props) {
  return render(
    <MemoryRouter>
      <AdminDashboardCard {...props} />
    </MemoryRouter>
  );
}

describe("AdminDashboardCard", () => {
  it("renders title and description", () => {
    renderCard({
      title: "Events Management",
      description: "Manage events",
      icon: MockIcon,
      href: "/admin/events",
      actionLabel: "Open Events",
    });
    expect(screen.getByText("Events Management")).toBeInTheDocument();
    expect(screen.getByText("Manage events")).toBeInTheDocument();
  });

  it("renders icon", () => {
    renderCard({
      title: "x",
      description: "x",
      icon: MockIcon,
      href: "/",
      actionLabel: "x",
    });
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("renders Link with href and actionLabel", () => {
    renderCard({
      title: "x",
      description: "x",
      icon: MockIcon,
      href: "/admin/team",
      actionLabel: "Open Team",
    });
    const link = screen.getByRole("link", { name: /Open Team/ });
    expect(link).toHaveAttribute("href", "/admin/team");
  });
});
