import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn((db, name) => ({ db, name })),
  deleteDoc: vi.fn(),
  doc: vi.fn((db, name, id) => ({ db, name, id })),
  getDocs: vi.fn(),
  orderBy: vi.fn((field, dir) => ({ orderBy: field, dir })),
  query: vi.fn((coll, ...args) => ({ coll, args })),
  serverTimestamp: vi.fn(() => "SERVER_TIMESTAMP"),
  updateDoc: vi.fn(),
}));

vi.mock("../../firebase/firebase", () => ({
  db: "MOCK_DB",
}));

import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../teamMembers";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("fetchMembers", () => {
  it("returns members with normalized order", async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: "m1",
          data: () => ({ name: "Alice", order: "5" }),
        },
        {
          id: "m2",
          data: () => ({ name: "Bob", order: null }),
        },
      ],
    });
    const members = await fetchMembers();
    expect(members).toEqual([
      { id: "m1", name: "Alice", order: 5 },
      { id: "m2", name: "Bob", order: 0 },
    ]);
  });
});

describe("addMember", () => {
  it("calls addDoc with trimmed and normalized payload", async () => {
    addDoc.mockResolvedValueOnce({ id: "new-id" });
    const result = await addMember({
      name: "  Alice  ",
      role: " Lead ",
      message: " Hi ",
      imageUrl: " url ",
      order: "3",
    });
    expect(result).toBe("new-id");
    const payload = addDoc.mock.calls[0][1];
    expect(payload).toMatchObject({
      name: "Alice",
      role: "Lead",
      message: "Hi",
      imageUrl: "url",
      order: 3,
      createdAt: "SERVER_TIMESTAMP",
    });
  });

  it("defaults missing fields to empty strings", async () => {
    addDoc.mockResolvedValueOnce({ id: "id" });
    await addMember({});
    const payload = addDoc.mock.calls[0][1];
    expect(payload.name).toBe("");
    expect(payload.role).toBe("");
    expect(payload.order).toBe(0);
  });
});

describe("updateMember", () => {
  it("calls updateDoc with normalized payload", async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    await updateMember("m1", {
      name: "Updated",
      role: "Vice",
      message: "Hello",
      imageUrl: "url",
      order: "10",
    });
    const payload = updateDoc.mock.calls[0][1];
    expect(payload).toEqual({
      name: "Updated",
      role: "Vice",
      message: "Hello",
      imageUrl: "url",
      order: 10,
    });
  });

  it("references the correct doc", async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    await updateMember("m1", {});
    expect(doc).toHaveBeenCalledWith("MOCK_DB", "teamMembers", "m1");
  });
});

describe("deleteMember", () => {
  it("calls deleteDoc with the correct ref", async () => {
    deleteDoc.mockResolvedValueOnce(undefined);
    await deleteMember("m1");
    expect(doc).toHaveBeenCalledWith("MOCK_DB", "teamMembers", "m1");
    expect(deleteDoc).toHaveBeenCalled();
  });
});
