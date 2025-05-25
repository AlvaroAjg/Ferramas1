'use client';

import { useState, useMemo, useEffect } from "react";
import { useCart } from "../../../components/cartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Plus, Minus, Trash } from "lucide-react";
import CurrencySelector from "../../../components/currencySelector";

export default function CarritoPage() {
  const { cart, removeFromCart, setCart, clearCart } = useCart();
  const totalInCLP = useMemo(() => cart.reduce((sum, p) => sum + p.precio * p.cantidad, 0), [cart]);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(totalInCLP);
  const [currency, setCurrency] = useState("CLP");

  useEffect(() => {
    if (totalInCLP !== 0 && totalInCLP !== convertedAmount) {
      setConvertedAmount(totalInCLP);
    }
  }, [totalInCLP]);

  const handleCurrencyChange = async (toCurrency: string) => {
    try {
      const res = await fetch(`/api/convert?amount=${convertedAmount}&to=${toCurrency}&from=${currency}`);
      const data = await res.json();
      setCurrency(toCurrency);
      setConvertedAmount(data.result);
    } catch (error) {
      console.error(error);
      alert('No se pudo cambiar la divisa');
    }
  };

  const handleDecrease = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].cantidad > 1) {
      updatedCart[index].cantidad -= 1;
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
      const randomUserId = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalInCLP,
          currency,
          userId: randomUserId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Error en el proceso de pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar tu pago");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      
      {/* Carrito */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Carrito de Compras</h1>

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
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3 text-center">Cantidad</th>
                  <th className="px-4 py-3 text-right">Precio</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
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
                        <button onClick={() => handleDecrease(index)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1">
                          <Minus size={16} />
                        </button>
                        <span>{producto.cantidad}</span>
                        <button onClick={() => handleIncrease(index)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1">
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="text-right px-4 font-semibold text-gray-800">
                      ${(producto.precio * producto.cantidad).toLocaleString()}
                    </td>
                    <td className="text-center px-4">
                      <button onClick={() => removeFromCart(index)} className="text-red-600 hover:text-red-800" title="Eliminar producto">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 border-t pt-6">
              <div className="flex gap-2 flex-wrap">
                <Link href="/">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                    <ShoppingBag size={16} className="inline-block mr-1" />
                    Seguir comprando
                  </button>
                </Link>
                <button onClick={clearCart} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm">
                  <Trash size={16} className="inline-block mr-1" />
                  Vaciar carrito
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <div className="text-right text-gray-800 text-xl font-bold">
                  Total: <span className="text-green-600">
                    {convertedAmount ? `${currency} ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : `CLP ${totalInCLP.toLocaleString()}`}
                  </span>
                </div>

                <CurrencySelector currency={currency} onChange={handleCurrencyChange} />
                <button
                  onClick={handlePayment}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded text-sm"
                >
                  Ir a pagar
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-white text-black rounded-xl shadow-md p-4 lg:p-3 max-w-md w-full mx-auto self-start">
        <h2 className="text-xl font-bold mb-3 text-center text-gray-800">Datos de Envío</h2>
        <form className="grid grid-cols-1 gap-3 text-sm">
          <input type="text" placeholder="Nombre completo" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Rut" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required/>
          <input type="email" placeholder="Correo electrónico" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Teléfono" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Dirección" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Ciudad" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Región / Estado" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <input type="text" placeholder="Código postal" className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400" required />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm"
          >
            Confirmar envío
          </button>
        </form>
      </div>

    </div>
  );
}
