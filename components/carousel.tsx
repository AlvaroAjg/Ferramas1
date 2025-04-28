'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/esmeril.webp",
  "/images/taladro.webp",
  "/images/carusel3.webp",
  "/images/carusel4.webp"
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Imagen del Carrusel */}
      <div className="overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          width={1200}
          height={600}
          className="object-cover w-full h-96"
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        &#60;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        &#62;
      </button>
    </div>
  );
}
