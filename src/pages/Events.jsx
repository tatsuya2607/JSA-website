import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ContactSection from "../components/sections/ContactSection";

import { EVENT_CATEGORIES, toCategoryLabel } from "../constants/eventSchema";

import useEvents from "../hooks/useEvents";
import useFilteredEvents from "../hooks/useFilteredEvents";
import { getCategories } from "../utils/getCategories";
import EventList from "../components/ui/EventList";
import EventListSkeleton from "../components/ui/EventListSkeleton";
import EmptyState from "../components/ui/EmptyState";
import FilterDropdown from "../components/ui/FilterDropdown";
import Hero from "../components/layout/Hero";
import Section from "../components/layout/Section";
import { tagColorMap } from "../constants/eventColors";



function Events() {
  const { events, loading } = useEvents();
  const { hash } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get("category");

  const initialCategory = selectedFromUrl
    ? toCategoryLabel(selectedFromUrl)
    : "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = getCategories();

  const filteredEvents = useFilteredEvents(events, activeCategory);


  useEffect(() => {
    if (activeCategory === "All") {
      setSearchParams({});
      return;
    }

    const categoryValue = EVENT_CATEGORIES.find(
      (category) => toCategoryLabel(category) === activeCategory
    );

    if (categoryValue) {
      setSearchParams({ category: categoryValue });
    }
  }, [activeCategory, setSearchParams]);

  useEffect(() => {
    if (!hash) return;

    const sectionId = hash.replace("#", "");
    const target = document.getElementById(sectionId);

    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [hash]);

  const categoryColor =
    tagColorMap[activeCategory] ||
    "bg-slate-200 text-slate-600";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero section */}
      <Hero
        title="Events"
        subtitle="Upcoming Festivals & Workshops"
        image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
        titleColor="text-white"
        subtitleColor="text-white"
      />

      {/* Filter and Events Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
        <div className="mb-12 flex justify-end">
          <FilterDropdown
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {activeCategory !== "All" && (
          <div className="mb-10 flex flex-col items-center gap-3">

            <p className="text-sm text-slate-500">
              Showing:
              <span className={`ml-2 font-semibold ${categoryColor}`}>
                {activeCategory}
              </span>
            </p>

            <button
              onClick={() => setActiveCategory("All")}
              className={`
                flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium
                ${categoryColor}
                hover:opacity-80 transition
              `}
              >
              {activeCategory}
              <span className="text-xs">✕</span>
            </button>

          </div>
        )}

        {/* Events Grid */}
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <EventListSkeleton count={6} />
          ) : filteredEvents.length > 0 ? (
            <EventList events={filteredEvents} />
          ) : (
            <EmptyState
              title="Coming Soon"
              message="No events yet"
              subMessage="Stay tuned!"
              buttonText="Back to Home"
              buttonLink="/"
            />
          )}
        </div>
      </section>

      {/* Contact Section */}
      <Section id="contact" bg="gray">
        <ContactSection bg="gray" />
      </Section>
    </div>
  );
}

export default Events;
