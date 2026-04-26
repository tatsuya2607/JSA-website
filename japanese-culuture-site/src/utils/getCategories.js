import { EVENT_CATEGORIES, toCategoryLabel } from "../constants/eventSchema";

// utils/getCategories.js
export function getCategories() {
  return ["All", ...EVENT_CATEGORIES.map((c) => toCategoryLabel(c))];
}