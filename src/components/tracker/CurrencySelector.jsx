import { currencies } from '../../constants/currencies'

export default function CurrencySelector({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 rounded bg-slate-700 border border-slate-600 ${className}`}
    >
      {currencies.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.code} - {currency.symbol} - {currency.name}
        </option>
      ))}
    </select>
  )
}
