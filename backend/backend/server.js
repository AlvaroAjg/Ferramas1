// backend/server.js

const express = require("express");
const { WebpayPlus } = require("transbank-sdk");
const { getExchangeRate } = require("./bancoCentral"); // Importa la función para obtener el tipo de cambio
const app = express();

app.use(express.json());  // Asegura que tu servidor pueda recibir datos en formato JSON

// API de pago
app.post("/api/payment", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Obtener el tipo de cambio desde el Banco Central
    const exchangeRate = await getExchangeRate(currency);

    // Convertir el monto si es necesario (Ejemplo: de CLP a USD)
    const convertedAmount = amount * exchangeRate;

    // Crear la transacción con Transbank
    const webpay = new WebpayPlus.Transaction();
    const response = await webpay.create({
      buyOrder: `${new Date().getTime()}`, // Generar una orden de compra única
      sessionId: "session_id_example", // El ID de sesión del usuario
      amount: convertedAmount,  // El monto convertido si es necesario
      returnUrl: "https://tusitio.com/return",  // URL a la que se redirigirá después del pago
      finalUrl: "https://tusitio.com/final",    // URL final después del pago
    });

    // Enviar la URL de pago a tu frontend
    res.json({ success: true, paymentUrl: response.url });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.json({ success: false, message: "Error al procesar el pago" });
  }
});

// Arrancar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
