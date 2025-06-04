import { signIn } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Registro() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutateAsync: registerAsync } = api.auth.register.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await registerAsync(formData);
    if (res.error) {
      alert(res.error);
    } else {
      alert("Registration successful!");
      await signIn(undefined, { callbackUrl: "/" });
    }
  };

  return (
    <div className="mx-auto max-w-md p-12">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="mb-1 block">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
