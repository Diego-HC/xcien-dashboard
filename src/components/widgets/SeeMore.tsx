import React from "react";

interface SeeMoreProps {
  onClick?: () => void;
}

const SeeMore: React.FC<SeeMoreProps> = ({ onClick }) => {
  return (
    <span
      style={{
        color: "#1976d2",
        cursor: "pointer",
        fontWeight: 500,
        userSelect: "none",
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label="Ver más"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      Ver Más &gt;
    </span>
  );
};

export default SeeMore;
