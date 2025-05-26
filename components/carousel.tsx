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
      
      <div className="relative w-full h-[550px]"> 
        <div className="absolute top-0 left-0 w-full h-full">
          
          <Image
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            layout="fill" 
            objectFit="cover" 
            className="w-full h-full" 
          />
        </div>
      </div>

      
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
