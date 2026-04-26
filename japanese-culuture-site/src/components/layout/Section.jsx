function Section({
  children,
  bg = "white",
  id,
  className = ""
}) {
  const bgClass =
    bg === "gray"
      ? "bg-gray-100"
      : bg === "dark"
      ? "bg-slate-900 text-white"
      : "bg-white";

  return (
    <section id={id} className={`${bgClass} py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        {children}
      </div>
    </section>
  );
}

export default Section;