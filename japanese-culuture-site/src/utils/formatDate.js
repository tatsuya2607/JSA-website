// utils/formatDate.js
export function formatDate(startAt) {
  if (!startAt) return "TBD";

  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}