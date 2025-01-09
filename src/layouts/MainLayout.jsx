import Header from '../components/Header'

export default function MainLayout({ children, setCurrentPage, user, onLogout }) {
  return (
    <div className="min-h-screen">
      <Header 
        setCurrentPage={setCurrentPage} 
        user={user}
        onLogout={onLogout}
      />
      {children}
    </div>
  )
}
