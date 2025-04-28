"use client";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToProducts();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      scrollToProducts();
    }
  };
  
  const handlePageClick = (page: number) => {
    onPageChange(page);
    scrollToProducts();
  };
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    
    if (productsSection) {
      const yOffset = -100; 
      const y = productsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex gap-2 mt-8 justify-center items-center">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-gray-500 hover:bg-gray-600 disabled:opacity-50"
      >
        &#8592;
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageClick(i + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1
              ? "bg-red-600 text-white"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-gray-500 hover:bg-gray-600 disabled:opacity-50"
      >
        &#8594;
      </button>
    </div>
  );
}