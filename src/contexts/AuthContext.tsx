import { createContext, FC } from 'react'

import { useAuthentication } from '../hooks/useAuthentication'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext({} as ReturnType<typeof useAuthentication>)

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthentication()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
