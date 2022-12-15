import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PATHS } from 'router/paths'
import { useAuthContext } from 'hooks/useAuthContext'

export const AuthRoute: FC = ({ children }) => {
  const { authState } = useAuthContext()
  const location = useLocation()

  const isIssuer = location.pathname.includes('/issuer')

  if ((isIssuer && authState.authorizedAsIssuer) || (!isIssuer && authState.authorizedAsHolder)) {
    return <>{children}</>
  }

  return (
    <Navigate
      to={{
        pathname: isIssuer ? PATHS.ISSUER.SIGNIN : PATHS.HOLDER.SIGNIN,
      }}
      state={{ from: location }}
      replace
    />
  )
}
