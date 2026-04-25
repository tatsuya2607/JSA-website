export const EVENT_CATEGORIES = ["culture", "food", "workshop"];
export const EVENT_STATUSES = ["draft", "published"];

export const CATEGORY_LABELS = {
  culture: "Culture",
  food: "Food",
  workshop: "Workshop",
};

export function toCategoryLabel(value) {
  if (!value) return "Other";
  return CATEGORY_LABELS[value] ?? "Other";
}

export function normalizeEventPayload(payload) {
  return {
    title: payload.title?.trim() ?? "",
    category: EVENT_CATEGORIES.includes(payload.category) ? payload.category : "culture",
    startAt: payload.startAt ?? "",
    venueName: payload.venueName?.trim() ?? "",
    summary: payload.summary?.trim() ?? "",
    imageUrl: payload.imageUrl?.trim() ?? "",
    status: EVENT_STATUSES.includes(payload.status) ? payload.status : "draft",
  };
}
