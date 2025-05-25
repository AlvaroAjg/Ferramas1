"use client";

import { useEffect } from "react";
import { useCart } from "../../../components/cartContext";
import Link from "next/link";

export default function RetornoPage() {
  const { cart, clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * (item.cantidad ?? 1),
    0
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-green-600 mb-4">¡Gracias por tu compra!</h1>
      <p className="text-lg text-gray-700 mb-6">Tu pago se ha procesado correctamente.</p>

      <h2 className="text-2xl font-semibold mb-2">Resumen de compra</h2>
      <ul className="bg-white shadow rounded-lg p-4 mb-6">
        {cart.map((item) => (
          <li key={item.id} className="flex text-black justify-between border-b py-2">
            <span>{item.nombre} x {item.cantidad}</span>
            <span>${(item.precio * item.cantidad).toLocaleString()}</span>
          </li>
        ))}
        <li className="flex text-black justify-between font-bold pt-4">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </li>
      </ul>

      <Link href="/">
        <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
