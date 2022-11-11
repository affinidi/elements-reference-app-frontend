import { FC, useEffect } from 'react'
import { useAuthContext } from 'hooks/useAuthContext'

export const Bootstrap: FC = ({ children }) => {
  const { authenticate } = useAuthContext()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
