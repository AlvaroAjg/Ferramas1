"use client";

import { useCart } from "../../../components/cartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Plus, Minus, Trash } from "lucide-react";

export default function CarritoPage() {
  const { cart, removeFromCart, setCart, clearCart } = useCart();
  const total = cart.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  const handleDecrease = (index: number) => {
    const updatedCart = [...cart];
    const producto = updatedCart[index];

    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      setCart(updatedCart);
    } else {
      removeFromCart(index); // Si la cantidad baja a 0 o 1, elimina
    }
  };

  const handleIncrease = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].cantidad += 1;
    setCart(updatedCart);
  };

  const handlePayment = async () => {
    try {
      // Aquí puedes hacer una llamada a tu servidor que maneja la integración con Transbank
      // Pasamos el total del carrito como parámetro y la moneda
  
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "CLP", // Puedes convertir esta moneda usando el Banco Central
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Redirigir a la página de pago de Transbank
        window.location.href = data.paymentUrl; // Aquí la URL del portal de pago de Transbank
      } else {
        alert("Error en el proceso de pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar tu pago");
    }
  };
  

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          <p className="mb-3">No hay productos en el carrito.</p>
          <Link href="/">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded transition flex items-center mx-auto">
              <ShoppingBag size={16} className="mr-1.5" />
              Ir a comprar
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 max-w-3xl mx-auto">
          {cart.map((producto, index) => (
            <div key={index} className="flex items-center bg-gray-800 p-3 rounded sm:flex-row flex-col">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                width={70}
                height={50}
                className="rounded object-cover"
              />
              <div className="ml-3 flex-1 min-w-0">
                <h2 className="text-base font-bold truncate">
                  {producto.nombre} {producto.cantidad > 1 && `(${producto.cantidad})`}
                </h2>
                <p className="text-gray-400 text-sm truncate">{producto.descripcion}</p>
              </div>
              <div className="flex items-center gap-2 ml-2 sm:ml-5 mt-3 sm:mt-0">
                <span className="text-red-600 font-bold">
                  ${(producto.precio * producto.cantidad).toLocaleString()}
                </span>

                {/* Botón de añadir uno más */}
                <button
                  onClick={() => handleIncrease(index)}
                  className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-full transition"
                  aria-label="Añadir uno más"
                >
                  <Plus size={16} />
                </button>

                {/* Botón de restar uno */}
                <button
                  onClick={() => handleDecrease(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-full transition"
                  aria-label="Restar uno"
                >
                  <Minus size={16} />
                </button>

                {/* Botón de eliminar */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition"
                  aria-label="Eliminar producto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-3">
            <Link href="/">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded transition flex items-center text-sm">
                <ShoppingBag size={16} className="mr-1.5" />
                Seguir comprando
              </button>
            </Link>

            <button
              onClick={() => handlePayment()}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-4 rounded transition flex items-center text-sm"
            >
              Ir a Pagar
            </button>


            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded transition flex items-center text-sm mt-3 sm:mt-0"
            >
              <Trash size={16} className="mr-2" />
              Vaciar carrito
            </button>

            <div className="text-right font-bold text-white mt-3 sm:mt-0">
              Total: <span className="text-red-600 text-lg">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
