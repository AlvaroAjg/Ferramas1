export async function convertFromCLP(amount: number, toCurrency: string, fromCurrency: string) {
    const accessKey = "a68d118290947bdd347acd6d8b1b5803";
  
    const url = `https://api.exchangerate.host/convert?access_key=${accessKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    console.log("🔍 Respuesta de exchangerate.host:", data);
  
    if (!data || typeof data.result !== "number") {
      throw new Error(`No se pudo obtener la tasa de cambio para ${toCurrency}`);
    }
  
    return {
      rate: data.info?.rate ?? 0,
      result: data.result,
    };
  }
  