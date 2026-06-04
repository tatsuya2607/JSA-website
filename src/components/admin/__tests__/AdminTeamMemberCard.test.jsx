import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminTeamMemberCard from "../AdminTeamMemberCard";

const baseMember = {
  id: "m-1",
  name: "Tatsuya",
  role: "President",
  message: "Welcome",
  imageUrl: "https://example.com/me.jpg",
  order: 5,
};

describe("AdminTeamMemberCard", () => {
  it("renders name, role, and message", () => {
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    expect(screen.getByText("Tatsuya")).toBeInTheDocument();
    expect(screen.getByText("President")).toBeInTheDocument();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("renders 'No image' when imageUrl is missing", () => {
    render(
      <AdminTeamMemberCard
        member={{ ...baseMember, imageUrl: "" }}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    expect(screen.getByText("No image")).toBeInTheDocument();
  });

  it("displays order in input", () => {
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    const input = screen.getByLabelText("Order");
    expect(input).toHaveValue(5);
  });

  it("updates order input value when user types", async () => {
    const user = userEvent.setup();
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    const input = screen.getByLabelText("Order");
    await user.clear(input);
    await user.type(input, "10");
    expect(input).toHaveValue(10);
  });

  it("calls handleQuickOrderUpdate on blur", async () => {
    const user = userEvent.setup();
    const handleQuickOrderUpdate = vi.fn();
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={handleQuickOrderUpdate}
      />
    );
    const input = screen.getByLabelText("Order");
    await user.click(input);
    await user.tab();
    expect(handleQuickOrderUpdate).toHaveBeenCalled();
  });

  it("syncs order when member prop changes", () => {
    const { rerender } = render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    rerender(
      <AdminTeamMemberCard
        member={{ ...baseMember, order: 99 }}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    const input = screen.getByLabelText("Order");
    expect(input).toHaveValue(99);
  });

  it("calls beginEdit when Edit clicked", async () => {
    const user = userEvent.setup();
    const beginEdit = vi.fn();
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={beginEdit}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    await user.click(screen.getByText("Edit"));
    expect(beginEdit).toHaveBeenCalledWith(baseMember);
  });

  it("calls handleDelete with id when Delete clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <AdminTeamMemberCard
        member={baseMember}
        beginEdit={() => {}}
        handleDelete={handleDelete}
        handleQuickOrderUpdate={() => {}}
      />
    );
    await user.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledWith("m-1");
  });
});
