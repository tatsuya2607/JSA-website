import { EVENT_CATEGORIES, toCategoryLabel } from "../constants/eventSchema";

export function getCategories() {
  return ["All", ...EVENT_CATEGORIES.map((c) => toCategoryLabel(c))];
}