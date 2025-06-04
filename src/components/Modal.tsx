import { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Modal “window” */}
      <div className="relative w-11/12 max-w-2xl overflow-hidden rounded-lg bg-white p-6 shadow-lg">
        {/* Close button in top‐right corner */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-semibold text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* User‐provided content */}
        {children}
      </div>
    </div>
  );
}
