import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  changePassword as changePasswordFor,
  clearSession,
  createAccount,
  getAccounts,
  loadSession,
  resetPassword as resetPasswordFor,
  saveSession,
  updateAccount,
} from '../utils/accounts'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (getAccounts(), loadSession()))

  const signIn = useCallback((account, remember = true) => {
    saveSession(account.id, remember)
    setUser(account)
  }, [])

  const signOut = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const signUp = useCallback((form) => {
    const result = createAccount(form)
    if (result.ok) {
      saveSession(result.account.id, true)
      setUser(result.account)
    }
    return result
  }, [])

  const updateProfile = useCallback(
    (patch) => {
      if (user) setUser(updateAccount(user.id, patch))
    },
    [user],
  )

  const changePassword = useCallback(
    (current, next, confirm) => {
      const result = changePasswordFor(user.id, current, next, confirm)
      if (result.ok) setUser(updateAccount(user.id, {}))
      return result
    },
    [user],
  )

  const value = useMemo(
    () => ({ user, signIn, signOut, signUp, updateProfile, changePassword, resetPassword: resetPasswordFor }),
    [user, signIn, signOut, signUp, updateProfile, changePassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
