import "./globals.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { CartProvider } from "../../components/cartContext";

export const metadata = {
  title: "Ferramas",
  description: "La mejor tienda online de herramientas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          <main className=" mx-auto p-4">
            {children}
          </main>

         
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
