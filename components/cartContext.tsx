"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Producto {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

interface CartContextType {
  cart: Producto[];
  setCart: (cart: Producto[]) => void; // <<< AÑADIMOS ESTO
  addToCart: (producto: Producto) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}



const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Producto[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto: Producto) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((p) => p.id === producto.id); // Mejor usar ID

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].cantidad += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]); // Vaciar el carrito
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
