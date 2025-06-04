import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Unauthorized() {
  return (
    <>
      <Head>
        <title>No autorizado - XCien</title>
        <meta name="description" content="Acceso no autorizado" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Acceso no autorizado
          </h1>

          <p className="mb-8 text-gray-600">
            No tienes permisos para acceder a esta página. Por favor, inicia
            sesión con una cuenta válida.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/" })}
              className="block w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
