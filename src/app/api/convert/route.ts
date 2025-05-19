import { convertFromCLP } from "../../../../utils/convertFromCLP";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = Number(searchParams.get("amount"));
  const toCurrency = searchParams.get("to");
  const fromCurrency = searchParams.get("from");

  console.log({
    amount,
    toCurrency
  })

  if (!amount || !toCurrency || !fromCurrency) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  try {
    const data = await convertFromCLP(amount, toCurrency, fromCurrency);
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en la conversión" }, { status: 500 });
  }
}
