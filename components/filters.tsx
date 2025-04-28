"use client";

export default function Filters({
  categories,
  onSelectCategory,
}: {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
}) {
  return (
    <div className="flex justify-center mb-8 p-6">
      <select
        onChange={(e) =>
          onSelectCategory(e.target.value === "" ? null : e.target.value)
        }
        className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
