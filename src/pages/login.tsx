import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Login() {
  const router = useRouter();
  const loginMutation = api.auth.login.useMutation();

  const login = loginMutation.mutateAsync;
  const isLoading = loginMutation.status === "pending";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ email, password });
      console.log("Usuario logueado:", user);
      await router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <img
            src="https://portal.xcien.com/web/image/website/7/logo?unique=106c8df"
            alt="Logo"
            className="h-32 w-32 object-contain"
          />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="bluegopher@tec.mx"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-500">{error}</div>
          )}

          <div className="mb-6 text-right">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-[#2A4365] focus:text-[#2A4365] focus:outline-none"
            >
              Crear cuenta
            </a>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#2A4365" }}
            className="w-full rounded-md px-4 py-2 text-white transition duration-300 hover:brightness-90"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "INGRESAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
