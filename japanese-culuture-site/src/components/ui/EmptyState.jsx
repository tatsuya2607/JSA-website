import FadeIn from "./FadeIn";

function EmptyState({
  title = "No Data",
  message = "Nothing to display",
  subMessage,
  buttonText,
  buttonLink,
}) {
  return (
    <FadeIn className="flex flex-col items-center justify-center py-32 text-center">
      {/* Icon */}
      <div className="mb-6 text-slate-300">
        <svg
          className="w-20 h-20 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-700 mb-3">
        {title}
      </h2>

      {/* Message */}
      <p className="text-slate-500 max-w-md">
        {message}
      </p>

      {/* Sub Message（optional） */}
      {subMessage && (
        <p className="text-sm text-slate-400 mt-2">
          {subMessage}
        </p>
      )}

      {/* Button（optional） */}
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
        >
          {buttonText}
        </a>
      )}
    </FadeIn>
  );
}

export default EmptyState;