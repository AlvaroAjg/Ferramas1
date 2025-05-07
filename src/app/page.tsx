"use client";

import { useState } from "react";
import { products } from "./product";
import ProductCard from "../../components/produtCard";
import Pagination from "../../components/pagination";
import Filters from "../../components/filters";
import Carousel from "../../components/carousel";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const productsPerPage = 9;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoria === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const categories = [...new Set(products.map((p) => p.categoria))];

  return (
    <div className="p-4">
      {/* Cuadro de bienvenida con sombra profunda */}
      <div className="bg-gray-300 text-center py-12 px-4 rounded-xl mb-12 border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-red-600">
            ¡Bienvenido a Ferramas!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Tu tienda de confianza para herramientas eléctricas, manuales y mucho más.
          </p>
          <p className="text-sm sm:text-base text-gray-500 italic">
            Calidad, seguridad y buen precio en un solo lugar.
          </p>
        </div>
      </div>

      <div className="w-full">
        <Carousel />
      </div>

      <Filters
        categories={categories}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
      />

      <div className="text-center mb-8">
        {selectedCategory ? (
          <h2 className="text-2xl font-semibold text-gray-300">
            Productos de: <span className="text-red-500">{selectedCategory}</span>
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold text-gray-900">
            Todos los productos
          </h2>
        )}
      </div>

      <section id="products-section" className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
