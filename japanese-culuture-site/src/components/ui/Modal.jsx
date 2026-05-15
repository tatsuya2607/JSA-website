import { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg text-black rounded-xl bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default Modal;