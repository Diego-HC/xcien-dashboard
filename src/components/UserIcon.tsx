import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function UserIcon() {
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  const { data: sessionData } = useSession();

  return (
    <div className="fixed top-4 right-6 z-50">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="rounded-full shadow-lg transition hover:opacity-80"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://th.bing.com/th/id/OIP.9SPGZ-aAEq2vraXqnax8sQAAAA?rs=1&pid=ImgDetMain"
          alt="Usuario"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white p-2 text-gray-800 shadow-lg">
          {sessionData ? (
            <button
              onClick={() => signOut({ callbackUrl: "/unauthorized" })}
              className="w-full cursor-pointer rounded-md p-2 hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          ) : (
            <div className="flex flex-col justify-start gap-2">
              <button
                onClick={() => signIn()}
                className="cursor-pointer rounded-md p-2 hover:bg-slate-100"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => router.push("/registro")}
                className="cursor-pointer rounded-md p-2 hover:bg-slate-100"
              >
                Registrate
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
