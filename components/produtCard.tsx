"use client";

import Image from "next/image";
import { useCart } from "./cartContext";
import { useState } from "react";

interface Producto {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad?: number;
  stock: number;
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productoActualizado] = useState<Producto>(producto);

  const handleAddToCart = () => {
    addToCart({ ...productoActualizado, cantidad: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition hover:scale-[1.015] duration-200">
        <Image
          src={productoActualizado.imagen}
          alt={productoActualizado.nombre}
          width={300}
          height={200}
          className="object-cover w-full h-56"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{productoActualizado.nombre}</h3>
          <p className="text-sm text-gray-500">Stock disponible: {productoActualizado.stock}</p>
          <p className="text-gray-500 text-sm line-clamp-2">{productoActualizado.descripcion}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-red-600 font-bold text-lg">${productoActualizado.precio.toLocaleString()}</span>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-700 transition"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-xl relative overflow-hidden">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl z-10"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 w-full bg-gray-100 flex items-center justify-center p-4">
                <Image
                  src={productoActualizado.imagen}
                  alt={productoActualizado.nombre}
                  width={300}
                  height={300}
                  className="object-contain w-full h-auto rounded"
                />
              </div>
              <div className="p-6 md:w-1/2 w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{productoActualizado.nombre}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Stock disponible: {productoActualizado.stock}
                </p>
                <p className="text-gray-600 mb-4">{productoActualizado.descripcion}</p>
                <p className="text-red-600 font-semibold text-xl mb-6">
                  ${productoActualizado.precio.toLocaleString()}
                </p>
                <button
                  onClick={handleAddToCart}
                  className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg text-sm uppercase font-medium transition disabled:opacity-50"
                  disabled={productoActualizado.stock <= 0}
                >
                  {productoActualizado.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
          Producto añadido al carrito
        </div>
      )}
    </>
  );
}

const style = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
`;

if (typeof document !== "undefined" && !document.getElementById("fade-in-up-style")) {
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  styleElement.id = "fade-in-up-style";
  document.head.appendChild(styleElement);
}
