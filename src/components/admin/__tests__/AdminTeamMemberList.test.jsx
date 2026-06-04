import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminTeamMemberList from "../AdminTeamMemberList";

const sampleMembers = [
  { id: "m1", name: "Alice", role: "Lead", message: "Hi", order: 1, imageUrl: "" },
  { id: "m2", name: "Bob", role: "Member", message: "Hello", order: 2, imageUrl: "" },
];

describe("AdminTeamMemberList", () => {
  it("shows loading state when isLoading", () => {
    render(
      <AdminTeamMemberList
        members={[]}
        isLoading={true}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    expect(screen.getByText("Loading team members...")).toBeInTheDocument();
  });

  it("shows empty state when no members and not loading", () => {
    render(
      <AdminTeamMemberList
        members={[]}
        isLoading={false}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    expect(screen.getByText("No team members yet.")).toBeInTheDocument();
  });

  it("renders all members", () => {
    render(
      <AdminTeamMemberList
        members={sampleMembers}
        isLoading={false}
        beginEdit={() => {}}
        handleDelete={() => {}}
        handleQuickOrderUpdate={() => {}}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
