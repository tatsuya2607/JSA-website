import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getEvents } from "../api/events";

function formatDate(startAt) {
  if (!startAt) return "TBD";

  const date = new Date(startAt);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toLabel(value) {
  if (!value) return "Other";
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Events() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(
      events
        .map((event) => event.category)
        .filter(Boolean)
        .map((category) => toLabel(category))
    );

    return ["All", ...unique];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return events;

    return events.filter((event) => toLabel(event.category) === activeCategory);
  }, [activeCategory, events]);

  return (
    <div className="bg-slate-50 text-slate-800">
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Frame 3
          </p>
          <h1 className="mb-5 text-5xl font-bold text-white md:text-6xl">Events</h1>
          <p className="text-lg text-white/90 md:text-xl">Upcoming Festivals & Workshops</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              className="flex items-center gap-2 font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Filter by Category
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      activeCategory === category
                        ? "bg-slate-50 font-semibold text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500">
                      Event image will be announced soon.
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-indigo-600">{formatDate(event.startAt)}</span>
                    {event.category ? (
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        {toLabel(event.category)}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mb-3 text-xl font-semibold text-slate-900">{event.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">{event.summary}</p>
                  <p className="mt-3 text-sm text-slate-500">{event.venueName || "Venue TBD"}</p>

                  <div className="mt-5 flex items-center text-sm font-semibold text-slate-400 transition-colors group-hover:text-indigo-600">
                    Learn more
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            There are currently no events in this category.
          </div>
        )}
      </section>
    </div>
  );
}

export default Events;
