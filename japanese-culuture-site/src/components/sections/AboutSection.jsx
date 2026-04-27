import Section from "../layout/Section";
import AboutCard from "../ui/AboutCard";
import TeamSection from "./TeamSection";
import { aboutCardData } from "../../data/AboutCardData";

function AboutSection() {
  return (
    <Section id="about" bg="gray">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          About Japanese Student Association
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-5">
          We are a passionate group of students dedicated to sharing 
          and celebrating Japanese culture. Through events, workshops,
          and cultural exchanges, we aim to bridge cultures 
          and create lasting connections within our university community.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {aboutCardData.map((data) => (
            <AboutCard key={data.id} {...data} />
          ))}
        </div>
      </div>

    </Section>
  );
}

export default AboutSection;