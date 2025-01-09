import { useState, useEffect } from 'react'
import Card from '../ui/Card'
import CurrencySelector from './CurrencySelector'
import { getSymbol } from '../../constants/currencies'

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })
  
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency')
    return saved || 'USD'
  })
  
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    currency: currency
  })

  const [exchangeRates, setExchangeRates] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('preferredCurrency', currency)
  }, [currency])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTransaction.amount || !newTransaction.description) return
    
    setTransactions(prev => [...prev, { 
      ...newTransaction, 
      id: Date.now(),
      currency: currency 
    }])
    setNewTransaction({
      type: 'income',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      currency: currency
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const convertAmount = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount
    // In a real app, you would use actual exchange rates here
    // This is a placeholder conversion
    return amount
  }

  const calculateTotal = (type) => {
    return transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => {
        const convertedAmount = convertAmount(
          parseFloat(t.amount),
          t.currency || 'USD',
          currency
        )
        return sum + convertedAmount
      }, 0)
  }

  const totalIncome = calculateTotal('income')
  const totalExpenses = calculateTotal('expense')
  const balance = totalIncome - totalExpenses

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Finance Tracker</h2>
        <div className="flex gap-4">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
            className="w-48"
          />
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 rounded">
          <div className="text-sm">Total Income</div>
          <div className="text-2xl font-bold">
            {getSymbol(currency)}{totalIncome.toFixed(2)}
          </div>
        </div>
        <div className="p-4 bg-red-500 rounded">
          <div className="text-sm">Total Expenses</div>
          <div className="text-2xl font-bold">
            {getSymbol(currency)}{totalExpenses.toFixed(2)}
          </div>
        </div>
        <div className={`p-4 ${balance >= 0 ? 'bg-green-500' : 'bg-yellow-500'} rounded`}>
          <div className="text-sm">Balance</div>
          <div className="text-2xl font-bold">
            {getSymbol(currency)}{balance.toFixed(2)}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={newTransaction.type}
              onChange={e => setNewTransaction(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={newTransaction.amount}
                onChange={e => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                className="flex-1 p-2 rounded bg-slate-700 border border-slate-600"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={newTransaction.description}
            onChange={e => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={newTransaction.date}
            onChange={e => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Add Transaction
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-medium">Recent Transactions</h3>
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className={`p-4 rounded flex justify-between items-center ${
              transaction.type === 'income' ? 'bg-blue-500/20' : 'bg-red-500/20'
            }`}
          >
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-gray-400">{transaction.date}</div>
            </div>
            <div className="font-medium">
              {transaction.type === 'income' ? '+' : '-'}
              {getSymbol(transaction.currency || 'USD')}
              {parseFloat(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
