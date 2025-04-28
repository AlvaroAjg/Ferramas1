"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12 w-full">
      <div className="px-4 flex flex-col md:flex-row justify-between items-center w-full">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-bold">Ferramas</h3>
          <p className="text-sm">Tu ferretería de confianza desde 1995</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Inicio</a>
          <a href="#" className="hover:text-white transition">Productos</a>
          <a href="#" className="hover:text-white transition">Contacto</a>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ferramas. Todos los derechos reservados.
      </div>
    </footer>
  );
}
