import { createContext, useContext, useState, useEffect } from 'react'
import { users } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sfa_user')
      if (stored) setUser(JSON.parse(stored))
    } catch (_) { localStorage.removeItem('sfa_user') }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    if (!email.includes('@')) return { success: false, error: 'Invalid email address' }
    const found = users.find(u => u.email === email && u.password === password)
    const userData = found
      ? { email: found.email, name: found.name }
      : { email, name: email.split('@')[0] }
    setUser(userData)
    localStorage.setItem('sfa_user', JSON.stringify(userData))
    return { success: true }
  }

  const signup = (name, email, password) => {
    if (!email.includes('@')) return { success: false, error: 'Invalid email address' }
    if (!name.trim()) return { success: false, error: 'Name is required' }
    const userData = { email, name }
    setUser(userData)
    localStorage.setItem('sfa_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sfa_user')
  }

  return (
    <AuthContext.Provider value={{user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}