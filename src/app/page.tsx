"use client";

import { useState } from "react";
import { products } from "./product";
import ProductCard from "../../components/produtCard";
import Pagination from "../../components/pagination";
import Filters from "../../components/filters";
import Carousel from "../../components/carousel";
import Footer from "../../components/footer";

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
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">¡Bienvenido a Ferramas!</h1>
        <p className="text-gray-400 text-lg">
          Tu tienda de confianza para herramientas eléctricas, manuales y mucho más.
        </p>
      </div>

      <Carousel />

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
          <h2 className="text-2xl font-semibold text-gray-300">
             Todos los productos
             
          </h2>
        )}
      </div>

      <section id="products-section">
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProducts.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

     
      <Footer />
    </div>
  );
}
