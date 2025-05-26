"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const registerUser = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, rut, email, password }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Error en el registro. Intente de nuevo.");
        return;
      }

      
      setUser(data.user);
      router.push("/"); 
    } catch (err) {
      console.error(err);
      setError("Hubo un error, intente de nuevo más tarde.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    await registerUser();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-red-600">Ferramas</h1>
          <p className="text-gray-500 text-sm mt-1">Crea tu cuenta</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Tu nombre completo"
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">RUT</label>
            <input
              type="text"
              placeholder="12.345.678-9"
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
            />
          </div>
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
              placeholder="Mínimo 6 caracteres"
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-red-600 font-medium hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
