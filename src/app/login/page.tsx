"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json();
      if (!data.success) {
        setError("Usuario o contraseña incorrectos.");
        return
      }
      setUser(data.user);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Hubo un error, intente de nuevo.");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-red-600">Ferramas</h1>
          <p className="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Tu contraseña"
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-black w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-red-600 font-medium hover:underline">
              Crea una aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
