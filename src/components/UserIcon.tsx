import { useRouter } from "next/router";
import { useState } from "react";

export default function UserIcon() {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed top-4 right-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={() => router.push("/login")}
        className="rounded-full shadow-lg transition hover:opacity-80"
      >
        <img
          src="https://th.bing.com/th/id/OIP.9SPGZ-aAEq2vraXqnax8sQAAAA?rs=1&pid=ImgDetMain"
          alt="Usuario"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 rounded bg-gray-800 px-3 py-1 text-sm text-white shadow-lg">
          Cerrar sesión
        </div>
      )}
    </div>
  );
}
