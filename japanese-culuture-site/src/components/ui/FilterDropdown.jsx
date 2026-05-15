import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FadeIn from "./FadeIn";

function FilterDropdown({ categories, activeCategory, setActiveCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

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

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % categories.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? categories.length - 1 : prev - 1
        );
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, categories.length]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <FadeIn delay={500}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
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
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-48 rounded-xl border bg-white shadow-xl"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              role="option"
              aria-selected={activeCategory === category}
              ref={(el) => (itemRefs.current[index] = el)}
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