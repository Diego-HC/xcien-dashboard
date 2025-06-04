import { type ReactNode, useState } from "react";
import Modal from "../Modal";

interface SeeMoreProps {
  // onClick?: () => void;
  children: ReactNode;
}

export default function SeeMore({
  children,
} : SeeMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
      >
        Ver más 
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
}
