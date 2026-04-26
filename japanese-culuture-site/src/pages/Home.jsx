import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ContactSection from "../components/sections/ContactSection";
import TeamSection from "../components/sections/TeamSection";

import useEvents from "../hooks/useEvents";
import useFilteredEvents from "../hooks/useFilteredEvents";

import Hero from "../components/layout/Hero";
import Section from "../components/layout/Section";
import AboutSection from "../components/sections/AboutSection";
import CultureSectonWrapper from "../components/sections/CultureSectonWrapper";
import EventsSection from "../components/sections/EventSection";


function Home() {
  const events = useEvents();
  const { hash } = useLocation();

  const filteredEvents = useFilteredEvents(events, "All");

  useEffect(() => {
    if (!hash) return;

    const sectionId = hash.replace("#", "");
    const target = document.getElementById(sectionId);

    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [hash]);


  return (
    // Hero 
    <>
      <Hero
        title="Discover Japan"
        subtitle="Explore the rich heritage, traditions, and modern culture of Japan through our student community"
        image="https://images.unsplash.com/photo-1528164344705-47542687000d"
      />

      <section className="bg-white py-8 border-b border-gray-100 sticky top-0 z-30 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4">
        <a href="#events" className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100">Upcoming Events</a>
        <a href="#about" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">About</a>
        <a href="#contact" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100">Contact</a>
      </div>
      </section>

      {/* About */}
      <Section id="about" bg="gray">
        <AboutSection />
        <TeamSection />
      </Section>

      {/* Japanese Culture */}
      <Section id="culture" bg="white">
        <CultureSectonWrapper />
      </Section>

      {/* Upcoming Events */}
      <EventsSection events={filteredEvents} />

      {/* Get In Touch */}
      <ContactSection />
    </>
  );
}

export default Home;
