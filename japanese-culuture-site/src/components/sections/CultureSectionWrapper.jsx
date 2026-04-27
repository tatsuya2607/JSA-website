import Section from "../layout/Section";
import CultureSection from "../ui/CultureSection";
import { cultureData } from "../../data/CultureData";

function CultureSectionWrapper() {
  return (
    <Section id="culture" bg="white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Japanese Culture
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mt-5">
          Explore the diverse and fascinating aspects of Japanese culture, 
          from ancient traditions to modern innovations.
        </p>
      </div>

      {/* Content */}
      {cultureData.map((data, index) => (
        <CultureSection
          key={data.id}
          {...data}
          isReversed={index % 2 === 0}
        />
      ))}
    </Section>
  );
}

export default CultureSectionWrapper;