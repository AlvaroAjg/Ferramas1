"use client";

import Link from "next/link";
import useUserStore from "@/store/userStore";

export default function UserDisplay() {
  const user = useUserStore((state) => state.user);

  if (user) {
    return <p className="text-white">Bienvenido, {user.name}</p>;
  }

  return (
    <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Iniciar sesión
    </Link>
  );
} 