export function formatDate(startAt, { withTime = false } = {}) {
  if (!startAt) return "TBD";

  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return "TBD";

  if (withTime) {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}