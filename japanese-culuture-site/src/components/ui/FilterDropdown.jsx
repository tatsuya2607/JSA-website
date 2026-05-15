import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FadeIn from "./FadeIn";

function FilterDropdown({ categories, activeCategory, setActiveCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <FadeIn delay={500}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900"
      >
        Filter by Category
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      </FadeIn>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border bg-white shadow-xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm ${
                activeCategory === category
                  ? "bg-slate-50 font-semibold text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;