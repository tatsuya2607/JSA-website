import { useMemo } from "react";
import { toCategoryLabel } from "../constants/eventSchema";

export default function useFilteredEvents(events, activeCategory) {
  return useMemo(() => {
    if (activeCategory === "All") return events;

    return events.filter(
      (event) => toCategoryLabel(event.category) === activeCategory
    );
  }, [events, activeCategory]);
}