import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("firebase/storage", () => ({
  getDownloadURL: vi.fn(),
  ref: vi.fn((storage, path) => ({ storage, path })),
  uploadBytes: vi.fn(),
}));

vi.mock("../../firebase/firebase", () => ({
  storage: "MOCK_STORAGE",
}));

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uploadImageFile } from "../uploads";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("uploadImageFile", () => {
  it("throws when no file is provided", async () => {
    await expect(uploadImageFile(null)).rejects.toThrow("No file selected");
  });

  it("uploads file and returns download URL", async () => {
    uploadBytes.mockResolvedValueOnce({});
    getDownloadURL.mockResolvedValueOnce("https://example.com/uploaded.jpg");
    const file = new File(["x"], "photo.jpg", { type: "image/jpeg" });
    const result = await uploadImageFile(file, "events");
    expect(result).toBe("https://example.com/uploaded.jpg");
    expect(uploadBytes).toHaveBeenCalled();
  });

  it("sanitizes file name (lowercases and removes special chars)", async () => {
    uploadBytes.mockResolvedValueOnce({});
    getDownloadURL.mockResolvedValueOnce("url");
    const file = new File(["x"], "My Photo!.jpg", { type: "image/jpeg" });
    await uploadImageFile(file, "events");
    const refCall = ref.mock.calls[0];
    const path = refCall[1];
    expect(path).toMatch(/events\/\d+-my-photo.jpg/);
  });

  it("uses default folder when not provided", async () => {
    uploadBytes.mockResolvedValueOnce({});
    getDownloadURL.mockResolvedValueOnce("url");
    const file = new File(["x"], "x.jpg", { type: "image/jpeg" });
    await uploadImageFile(file);
    expect(ref.mock.calls[0][1]).toMatch(/^uploads\//);
  });

  it("uses custom folder when provided", async () => {
    uploadBytes.mockResolvedValueOnce({});
    getDownloadURL.mockResolvedValueOnce("url");
    const file = new File(["x"], "x.jpg", { type: "image/jpeg" });
    await uploadImageFile(file, "teamMembers");
    expect(ref.mock.calls[0][1]).toMatch(/^teamMembers\//);
  });
});
