import { useState, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Blog from './pages/Blog'
import CoinDesk from './pages/CoinDesk'
import CryptoSlate from './pages/CryptoSlate'
import Cointelegraph from './pages/Cointelegraph'
import SignUpForm from './components/auth/SignUpForm'
import { financeLinks } from './constants/newsLinks'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const handleSignUp = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('home')
    // Clear any user-specific data from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('transactions')
    localStorage.removeItem('preferredCurrency')
  }

  const renderPage = () => {
    // If trying to access protected pages without being logged in
    if (!user && ['dashboard', 'blog'].includes(currentPage)) {
      return <SignUpForm onSignUp={handleSignUp} />
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'blog':
        return <Blog />
      case 'crypto':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Cryptocurrency News</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div onClick={() => setCurrentPage('coindesk')} className="cursor-pointer">
                <CoinDesk />
              </div>
              <div onClick={() => setCurrentPage('cryptoslate')} className="cursor-pointer">
                <CryptoSlate />
              </div>
              <div onClick={() => setCurrentPage('cointelegraph')} className="cursor-pointer">
                <Cointelegraph />
              </div>
            </div>
          </div>
        )
      case 'finance':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Financial News</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {financeLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                  <p className="text-gray-400">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        )
      case 'coindesk':
        return <CoinDesk />
      case 'cryptoslate':
        return <CryptoSlate />
      case 'cointelegraph':
        return <Cointelegraph />
      default:
        return <Home onNewsCardClick={setCurrentPage} />
    }
  }

  return (
    <MainLayout 
      setCurrentPage={setCurrentPage}
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </MainLayout>
  )
}
