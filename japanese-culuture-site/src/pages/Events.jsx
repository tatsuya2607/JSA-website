import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ContactSection from "../components/sections/ContactSection";

import { EVENT_CATEGORIES, toCategoryLabel } from "../constants/eventSchema";

import useEvents from "../hooks/useEvents";
import useFilteredEvents from "../hooks/useFilteredEvents";
import { getCategories } from "../utils/getCategories";
import EventList from "../components/ui/EventList";
import EmptyState from "../components/ui/EmptyState";
import FilterDropdown from "../components/ui/FilterDropdown";
import Hero from "../components/layout/Hero";


function Events() {
  const events = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get("category");

  const initialCategory = selectedFromUrl
    ? toCategoryLabel(selectedFromUrl)
    : "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Compute unique categories from events data
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

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
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
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default Events;
