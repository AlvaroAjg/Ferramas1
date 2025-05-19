'use client';

interface Props {
  currency: string;
  onChange: (currency: string) => void;
}

export default function CurrencySelector({ currency, onChange }: Props) {

  // useEffect(() => {
  //   const convert = async () => {
  //     if (currency === "CLP") {
  //       onChange(baseAmount, "CLP"); 
  //       return;
  //     }

  //     try {
  //       const res = await fetch(`/api/convert?amount=${baseAmount}&to=${currency}`);
  //       const data = await res.json();

  //       if (typeof data.result === "number") {
  //         onChange(data.result, currency);
  //       } else {
  //         onChange(baseAmount, "CLP");
  //       }
  //     } catch (error) {
  //       console.error("Error en la conversión:", error);
  //       onChange(baseAmount, "CLP");
  //     }
  //   };

  //   convert();
  // }, [currency, baseAmount, onChange]);

  return (
    <div className="text-sm text-gray-700">
      <label className="mr-2">Moneda:</label>
      <select
        value={currency}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="CLP">CLP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
}
