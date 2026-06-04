import useInView from "../../hooks/useInView";

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

export default FadeIn;