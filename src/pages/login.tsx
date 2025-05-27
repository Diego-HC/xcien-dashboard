export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Imagen */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://portal.xcien.com/web/image/website/7/logo?unique=106c8df"
            alt="Logo"
            className="h-32 w-32 object-contain"
          />
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="bluegopher@tec.mx"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
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
            />
          </div>

          <div className="mb-6 text-right">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-[#2A4365] focus:text-[#2A4365] focus:outline-none"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#2A4365" }}
            className="w-full rounded-md px-4 py-2 text-white transition duration-300 hover:brightness-90"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}
