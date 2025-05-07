"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/fotocarousel.jpg",
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Contenedor del carrusel */}
      <div className="relative w-full h-[550px]"> {/* Altura ajustada al gusto */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Imagen del carrusel que cubre todo el contenedor */}
          <Image
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            layout="fill" // La imagen ocupa todo el espacio disponible
            objectFit="cover" // La imagen cubre el contenedor sin distorsionarse
            className="w-full h-full" // Asegura que la imagen ocupe todo el contenedor
          />
        </div>
      </div>

      {/* Botones para avanzar y retroceder */}
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
