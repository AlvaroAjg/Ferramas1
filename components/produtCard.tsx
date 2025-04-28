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
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      ...producto,
      cantidad: 1,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-black shadow-md rounded-lg overflow-hidden flex flex-col relative">
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={300}
        height={200}
        className="object-cover w-full h-60"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
        <p className="text-gray-400 text-sm flex-grow">{producto.descripcion}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-red-600 font-bold">${producto.precio.toLocaleString()}</span>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
          >
            Añadir
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up z-50">
          Producto añadido al carrito
        </div>
      )}
    </div>
  );
}

// Animación del Toast
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

if (typeof document !== 'undefined') {
  if (!document.getElementById("fade-in-up-style")) {
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    styleElement.id = "fade-in-up-style"; 
    document.head.appendChild(styleElement);
  }
}
