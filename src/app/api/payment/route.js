import { NextResponse } from 'next/server';
import { WebpayPlus, Options } from 'transbank-sdk';

Options.commerceCode = '597055555532';
Options.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
Options.integrationType = 'TEST';

export async function POST(request) {
  try {
    
    const body = await request.json();
    
    const { amount, userId } = body;
    
    const buyOrder = Math.floor(Math.random() * 1000000).toString();
    const sessionId = userId.toString();
    const returnUrl = 'http://localhost:3000/retorno'; 

    const transaction = new WebpayPlus.Transaction();
    const result = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    return NextResponse.json({
      success: true,
      paymentUrl: `${result.url}?token_ws=${result.token}`,
    });
  } catch (err) {
    console.error("Error en la transacción:", err);
    return NextResponse.json({ success: false, message: 'Error al crear transacción' }, { status: 500 });
  }
}
