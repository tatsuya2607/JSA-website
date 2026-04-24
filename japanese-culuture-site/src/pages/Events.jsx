import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { getEvents } from "../api/events";

function useInView(options = { threshold: 0.1 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const directionClasses = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    none: "translate-y-0 translate-x-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `opacity-0 ${directionClasses[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

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

const tagColorMap = {
  Culture: "bg-emerald-100 text-emerald-700",
  Workshop: "bg-indigo-100 text-indigo-700",
  Social: "bg-pink-100 text-pink-700",
  Food: "bg-amber-100 text-amber-700",
  Other: "bg-slate-100 text-slate-700",
};

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[70vh]">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear hover:scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="relative z-10 mt-16 px-4 text-center">
          <FadeIn direction="up" delay={100}>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/80">Frame 3</p>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <h1 className="mb-6 font-serif text-5xl font-bold tracking-wide text-white drop-shadow-lg md:text-7xl">
              Events
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={500}>
            <p className="text-lg font-medium text-white/90 drop-shadow-md md:text-xl">
              Upcoming Festivals &amp; Workshops
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
        <div className="mb-12 flex justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              className="group flex items-center gap-2 font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Filter by Category
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
            {filteredEvents.map((event, index) => {
              const categoryLabel = toLabel(event.category);
              return (
                <FadeIn key={event.id} delay={index * 150} direction="up">
                  <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500">
                          Event image will be announced soon.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-grow flex-col p-6 md:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-indigo-600">
                          {formatDate(event.startAt)}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            tagColorMap[categoryLabel] || tagColorMap.Other
                          }`}
                        >
                          {categoryLabel}
                        </span>
                      </div>

                      <h2 className="mb-3 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                        {event.title}
                      </h2>

                      <p className="flex-grow text-sm leading-relaxed text-slate-600">{event.summary}</p>
                      <p className="mt-3 text-sm text-slate-500">{event.venueName || "Venue TBD"}</p>

                      <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 transition-colors group-hover:text-indigo-600">
                        Learn more
                        <ArrowRightIcon className="-translate-x-4 ml-1 h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            There are currently no events in this category.
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-24">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="mx-auto max-w-4xl text-center">
          <FadeIn direction="up">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">Get In Touch</h2>
            <p className="mx-auto mb-12 max-w-2xl text-slate-600">
              Interested in joining our community or learning more about Japanese culture? We&apos;d love to hear from you!
            </p>
          </FadeIn>

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <FadeIn delay={200} direction="up">
              <a
                href="mailto:jsa@university.edu"
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-bold text-slate-800">Email Us</h4>
                <p className="text-sm font-medium text-indigo-600">jsa@university.edu</p>
              </a>
            </FadeIn>

            <FadeIn delay={400} direction="up">
              <div className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-bold text-slate-800">Join Our Community</h4>
                <p className="text-center text-sm text-slate-500">
                  Open to all students interested in Japanese culture.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={600} direction="up">
            <div className="flex justify-center gap-4">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com" },
                { icon: FaXTwitter, href: "https://x.com" },
                { icon: FaInstagram, href: "https://www.instagram.com" },
              ].map(({ icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:text-white"
                >
                  {icon({ className: "h-5 w-5" })}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default Events;
