import "./globals.css";
import Navbar from "../../components/navbar";
import { CartProvider } from "../../components/cartContext";

export const metadata = {
  title: "Ferramas",
  description: "La mejor tienda online de herramientas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider> {/* 👈 El carrito envuelve TODO */}
          <Navbar /> {/* Navbar visible en todas las páginas */}
          <main className="max-w-7xl mx-auto p-4">{children}</main> {/* Contenido principal */}
        </CartProvider>
      </body>
    </html>
  );
}
