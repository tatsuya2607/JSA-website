import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ContactSection from "../components/sections/ContactSection";
import TeamSection from "../components/sections/TeamSection";

import useEvents from "../hooks/useEvents";
import useFilteredEvents from "../hooks/useFilteredEvents";

import Hero from "../components/layout/Hero";
import Section from "../components/layout/Section";
import AboutSection from "../components/sections/AboutSection";
import CultureSectonWrapper from "../components/sections/CultureSectionWrapper";
import EventsSection from "../components/sections/EventsSection";
import FadeIn from "../components/ui/FadeIn";


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

      {/* About */}
      <Section id="about" bg="gray">
        <FadeIn direction="up">
          <AboutSection />
        </FadeIn>
      </Section>

      {/* Japanese Culture */}
      <Section id="culture" bg="white">
        <FadeIn delay={100} direction="up">
          <CultureSectonWrapper />
        </FadeIn>
      </Section>

      {/* Upcoming Events */}
      <Section id="events" bg="gray">
        <FadeIn delay={200} direction="up">
          <EventsSection events={filteredEvents} />
        </FadeIn>
      </Section>

      {/* Meet the Team */}
      <Section id="team" bg="white">
        <FadeIn delay={300} direction="up">
          <TeamSection />
        </FadeIn>
      </Section>

      {/* Get In Touch */}
      <Section id="contact" bg="gray">
        <FadeIn delay={400} direction="up">
          <ContactSection bg="gray" />
        </FadeIn>
      </Section>
    </>
  );
}

export default Home;
