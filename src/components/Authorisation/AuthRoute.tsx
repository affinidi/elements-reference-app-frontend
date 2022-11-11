import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PATHS } from 'router/paths'
import { AppAuthStateStatus } from 'state/state'
import { useAuthContext } from '../../hooks/useAuthContext'

export const AuthRoute: FC = ({ children }) => {
  const { authState } = useAuthContext()
  const location = useLocation()

  if (authState.status !== AppAuthStateStatus.AUTHORIZED) {
    return <Navigate to={{ pathname: PATHS.HOLDER.SIGNIN }} state={{ from: location }} replace />
  }

  return <>{children}</>
}
