
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Imagen */}
        <div className="flex justify-center mb-6">
          <img
            src="https://portal.xcien.com/web/image/website/7/logo?unique=106c8df"
            alt="Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Formulario */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="bluegopher@tec.mx"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-[#2A4365] focus:text-[#2A4365] focus:outline-none">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#2A4365" }}
            className="w-full text-white py-2 px-4 rounded-md hover:brightness-90 transition duration-300"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
