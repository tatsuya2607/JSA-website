import FadeIn from "../ui/FadeIn";

function Hero({
  title,
  subtitle,
  image,
  titleColor = "text-white",
  subtitleColor = "text-white/90"
}) {
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[70vh]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">

        {/* Title */}
        <FadeIn delay={300}>
          <h1 className={`text-5xl font-bold md:text-7xl ${titleColor}`}>
            {title}
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={500}>
          <p className={`mt-4 text-lg md:text-xl ${subtitleColor}`}>
            {subtitle}
          </p>
        </FadeIn>

      </div>
    </section>
  );
}

export default Hero;