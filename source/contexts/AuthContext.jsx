import { createContext } from 'react'

const AuthContext = createContext({
  currentUser: null,
  userData: null,
  isLoading: true,
  isError: false
})

export default AuthContext
