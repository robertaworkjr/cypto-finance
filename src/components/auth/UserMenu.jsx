import { useState, useRef, useEffect } from 'react'
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'

export default function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
      >
        <FaUser className="text-gray-300" />
        <span className="text-sm">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-300 border-b border-slate-700">
              {user.email}
            </div>
            <a
              href="#settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
            >
              <FaCog />
              Settings
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
