import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutCard from "../components/AboutCard";
import CultureSection from "../components/CultureSection"
import EventCard from "../components/EventCard";
import ContactCard from "../components/ContactCard";
import SnsButton from "../components/SnsButton";
import { aboutCardData } from "../data/AboutCardData";
import { cultureData } from "../data/CultureData";
import { contactData } from "../data/ContactData";
import { getEvents } from "../api/events";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {

      try {
      const data = await getEvents();
      setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchData();
  }, []);

  const publishedEvents = events.slice(0, 3);

  const eventGridColumns =
    publishedEvents.length <= 1
      ? "md:grid-cols-1"
      : publishedEvents.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    // Hero 
    <>
      <section id="home" className="relative w-full h-[650px]">
        {/* 背景画像 */}
        <img
          src="https://images.unsplash.com/photo-1528164344705-47542687000d"
          alt="Japanese temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 黒いオーバーレイ */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* テキスト */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-1">
          <h1 className="text-white text-4xl md:text-6xl font-bold px-4 py-2">
            Discover Japan
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-2xl">
            Explore the rich heritage, traditions, and modern culture of Japan through our student community
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-100 py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black md:text-4xl font-bold">About Japanese Student Association</h1>
          <p className="text-gray-500 text-sm text-center md:text-lg max-w-2xl mt-5">
            We are a passionate group of students dedicated to sharing and celebrating Japanese culture.
            Through events, workshops, and cultural exchanges,
            we aim to bridge cultures and create lasting connections within our university community.
          </p>
          {/* Card */}
          <div className="mt-5 grid md:grid-cols-3 gap-8">
            {aboutCardData.map((data) => (
              <AboutCard
                key={data.id}
                icon={data.icon}
                title={data.title}
                description={data.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Japanese Culture */}
      <section id="culture" className="bg-white py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black md:text-4xl font-bold">Japanese Culture</h1>
          <p className="text-gray-500 text-sm text-center md:text-xl max-w-2xl mt-5 mb-1">
            Explore the diverse and fascinating aspects of Japanese culture, from ancient traditions to modern innovations.
          </p>
          <div>
            {cultureData.map((data, index) => (
              <CultureSection
                key={data.id}
                tag={data.tag}
                title={data.title}
                description={data.description}
                image={data.image}
                isReversed={index % 2 === 0}
                items={data.items}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="bg-gray-100 py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black md:text-3xl font-bold">Upcoming Events</h1>
          <p className="text-gray-500 text-sm text-center md:text-xl max-w-2xl mt-5">
            Join us for exciting cultural events and activities throughout the semester.
          </p>

          {publishedEvents.length > 0 ? (
            <>
              <div className={`mt-5 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 justify-items-center ${eventGridColumns}`}>
                {publishedEvents.map((data) => (
                  <EventCard
                    key={data.id}
                    category={data.category}
                    startAt={data.startAt}
                    title={data.title}
                    summary={data.summary}
                    venueName={data.venueName}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-8 w-full max-w-2xl rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
              There are currently no upcoming events. Please check back soon!
            </div>
          )}
          {publishedEvents.length > 0 && (
            <div className="mt-8">
              <a href="/events" className="inline-block px-6 py-3 
                bg-red-600 text-white rounded-lg hover:bg-red-400 transition-colors">
                View All Events
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Get In Touch */}
      <section id="contact" className="bg-white py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black md:text-3xl font-bold">Get In Touch</h1>
          <p className="text-gray-500 text-sm text-center md:text-xl max-w-2xl mt-5">
            Interested in joining our community or learning more about Japanese culture? We'd love to hear from you!
          </p>
          <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-10">
            {contactData.map((data) => (
              <ContactCard
                key={data.id}
                title={data.title}
                description={data.description}
                icon={data.icon}
                href={data.href}
              />
            ))}
          </div>
          <div className="mt-8">
            <SnsButton />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
