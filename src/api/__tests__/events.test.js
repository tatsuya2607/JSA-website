import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn((db, name) => ({ db, name })),
  deleteDoc: vi.fn(),
  doc: vi.fn((db, name, id) => ({ db, name, id })),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
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
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../events";

function buildSnapshot(events) {
  return {
    docs: events.map((event) => ({
      id: event.id,
      data: () => {
        const { id: _id, ...rest } = event;
        void _id;
        return rest;
      },
    })),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getEvents", () => {
  it("returns only published events by default", async () => {
    getDocs.mockResolvedValueOnce(
      buildSnapshot([
        { id: "1", status: "published", startAt: "2026-01-01" },
        { id: "2", status: "draft", startAt: "2026-02-01" },
      ])
    );
    const events = await getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].id).toBe("1");
  });

  it("includes drafts when includeDrafts is true", async () => {
    getDocs.mockResolvedValueOnce(
      buildSnapshot([
        { id: "1", status: "published", startAt: "2026-01-01" },
        { id: "2", status: "draft", startAt: "2026-02-01" },
      ])
    );
    const events = await getEvents({ includeDrafts: true });
    expect(events).toHaveLength(2);
  });

  it("sorts events by startAt ascending", async () => {
    getDocs.mockResolvedValueOnce(
      buildSnapshot([
        { id: "2", status: "published", startAt: "2026-02-01" },
        { id: "1", status: "published", startAt: "2026-01-01" },
        { id: "3", status: "published", startAt: "2026-03-01" },
      ])
    );
    const events = await getEvents();
    expect(events.map((e) => e.id)).toEqual(["1", "2", "3"]);
  });

  it("sends events with invalid startAt to the end", async () => {
    getDocs.mockResolvedValueOnce(
      buildSnapshot([
        { id: "no-date", status: "published", startAt: "" },
        { id: "valid", status: "published", startAt: "2026-01-01" },
      ])
    );
    const events = await getEvents();
    expect(events[0].id).toBe("valid");
    expect(events[1].id).toBe("no-date");
  });
});

describe("getEventById", () => {
  it("returns event with id when found", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      id: "abc",
      data: () => ({ title: "Test" }),
    });
    const event = await getEventById("abc");
    expect(event).toEqual({ id: "abc", title: "Test" });
  });

  it("returns null when not found", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => false,
    });
    const event = await getEventById("missing");
    expect(event).toBeNull();
  });
});

describe("createEvent", () => {
  it("calls addDoc with normalized payload and timestamps", async () => {
    addDoc.mockResolvedValueOnce({ id: "new-id" });
    const result = await createEvent({
      title: "  Test  ",
      category: "culture",
      startAt: "2026-01-01",
      summary: "test summary",
      status: "published",
    });
    expect(result).toBe("new-id");
    expect(addDoc).toHaveBeenCalled();
    const payload = addDoc.mock.calls[0][1];
    expect(payload.title).toBe("Test");
    expect(payload.createdAt).toBe("SERVER_TIMESTAMP");
    expect(payload.updatedAt).toBe("SERVER_TIMESTAMP");
  });
});

describe("updateEvent", () => {
  it("calls updateDoc with normalized payload and updatedAt", async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    await updateEvent("evt-1", {
      title: "Updated",
      category: "food",
      summary: "new",
      status: "draft",
    });
    expect(updateDoc).toHaveBeenCalled();
    const payload = updateDoc.mock.calls[0][1];
    expect(payload.title).toBe("Updated");
    expect(payload.updatedAt).toBe("SERVER_TIMESTAMP");
    expect(payload.createdAt).toBeUndefined();
  });

  it("uses the correct doc reference", async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    await updateEvent("evt-1", { title: "x", summary: "x" });
    expect(doc).toHaveBeenCalledWith("MOCK_DB", "events", "evt-1");
  });
});

describe("deleteEvent", () => {
  it("calls deleteDoc with correct reference", async () => {
    deleteDoc.mockResolvedValueOnce(undefined);
    await deleteEvent("evt-1");
    expect(doc).toHaveBeenCalledWith("MOCK_DB", "events", "evt-1");
    expect(deleteDoc).toHaveBeenCalled();
  });
});
