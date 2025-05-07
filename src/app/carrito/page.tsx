'use client'; // Esto indica que el componente es un "Client Component"

import { useCart } from "../../../components/cartContext"; // El hook useCart
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Plus, Minus, Trash } from "lucide-react";

export default function CarritoPage() {
  const { cart, removeFromCart, setCart, clearCart } = useCart(); // Aquí usas el hook useCart
  const total = cart.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

  const handleDecrease = (index: number) => {
    const updatedCart = [...cart];
    const producto = updatedCart[index];
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      setCart(updatedCart);
    } else {
      removeFromCart(index);
    }
  };

  const handleIncrease = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].cantidad += 1;
    setCart(updatedCart);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, currency: "CLP", userId: 12345 }),
      });
      

      const data = await response.json();
      if (data.success) {
        window.location.href = data.paymentUrl; // Redirige al usuario a la URL de Transbank
      } else {
        alert("Error en el proceso de pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar tu pago");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row p-6 space-x-6">
      <div className="flex-1 bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 p-8 border border-dashed border-gray-300 rounded-md">
            <p className="mb-4">Tu carrito está vacío.</p>
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                <ShoppingBag size={18} className="inline-block mr-2" />
                Ir a comprar
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-200 text-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-3">Producto</th>
                    <th scope="col" className="px-4 py-3 text-center">Cantidad</th>
                    <th scope="col" className="px-4 py-3 text-right">Precio</th>
                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((producto, index) => (
                    <tr key={index} className="bg-white border-b border-gray-200">
                      <td className="flex items-center gap-4 px-4 py-4">
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          width={60}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-xs text-gray-500">{producto.descripcion}</p>
                        </div>
                      </td>
                      <td className="text-center px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDecrease(index)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span>{producto.cantidad}</span>
                          <button
                            onClick={() => handleIncrease(index)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right px-4 font-semibold text-gray-800">
                        ${(producto.precio * producto.cantidad).toLocaleString()}
                      </td>
                      <td className="text-center px-4">
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar producto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4 border-t pt-4">
              <div className="flex gap-2 flex-wrap">
                <Link href="/">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                    <ShoppingBag size={16} className="inline-block mr-1" />
                    Seguir comprando
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm"
                >
                  <Trash size={16} className="inline-block mr-1" />
                  Vaciar carrito
                </button>
              </div>

              <div className="text-right text-gray-800 text-lg font-semibold">
                Total: <span className="text-red-600">${total.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePayment}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded text-sm"
              >
                Ir a pagar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
